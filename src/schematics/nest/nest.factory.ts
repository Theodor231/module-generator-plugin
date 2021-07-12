import { join, Path, strings } from "@angular-devkit/core";
import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from "@angular-devkit/schematics";

import {
  DeclarationOptions,
  ModuleDeclarator,
} from "../../utils/module.declarator";

import { ModuleFinder } from "../../utils/module.finder";
import { Location, NameParser } from "../../utils/name.parser";
import { mergeSourceRoot } from "../../utils/source-root.helpers";

import { ModOptions } from "./nest.schema";

import {
  lowerCase,
  upperCase,
  dashToUnderscore,
} from "../../utils/string-utils";

export function main(options: ModOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ])
    )(tree, context);
  };
}

function transform(options: ModOptions): ModOptions {
  const target: ModOptions = Object.assign({}, options);

  target.metadata = "imports";
  target.type = "module";

  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.path = join(
    strings.dasherize("modules/" + location.path) as Path,
    target.name
  );
  target.language = "ts";
  return target;
}

function generate(options: ModOptions) {
  return (context: SchematicContext) =>
    apply(url(join("./files" as Path, options.language)), [
      template({
        ...strings,
        ...options,
        lowerCase,
        upperCase,
        dashToUnderscore,
      }),
      move(options.path),
    ])(context);
}


function addDeclarationToModule(options: ModOptions): Rule {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    });
    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module).toString();
    
    const declarator: ModuleDeclarator = new ModuleDeclarator();
    
    tree.overwrite(
      options.module,
      declarator.declare(content, options as DeclarationOptions)
    );
    
    return tree;
  };
}

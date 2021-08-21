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

import { ModOptions } from "./angular.schema";

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
        mergeWith(generate(options)),
      ])
    )(tree, context);
  };
}

function transform(options: ModOptions): ModOptions {
  const target: ModOptions = Object.assign({}, options);

  target.metadata = "imports";
  target.type = "module";

  let location: Location = new NameParser().parse(target);

  target.name = strings.dasherize(location.name);
  target.path = join(strings.dasherize(location.path) as Path);
  target.language = "ts";
  return target;
}

function generate(options: ModOptions) {
  return (context: SchematicContext) =>
    apply(url(join("./files" as Path)), [
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

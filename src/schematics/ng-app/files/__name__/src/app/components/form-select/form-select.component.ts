import { Component, Input } from "@angular/core";
import { HelpersService } from "../../_services/helpers.service";

@Component({
  selector: "form-select",
  templateUrl: "./form-select.component.html",
  styleUrls: ["./form-select.component.scss"],
})
export class FormSelectComponent {
  @Input() label = "";
  @Input() itemText = "text";
  @Input() itemValue = "value";
  @Input() type = "text" as string;
  @Input() control = {
    errors: {} as any,
  } as any;
  @Input() field;
  @Input() error = "" as string;
  @Input() multiple;
  @Input() outlined = false as boolean;
  @Input() items = [] as Array<any>;

  roles = [
    { value: 1, text: "Admin" },
    { value: 2, text: "Tester" },
    { value: 3, text: "Guest" },
  ] as Array<any>;
  selectedItem = { text: "" } as any;
  showItems = false as boolean;

  constructor(public helpers: HelpersService) {}

  showErrors(): boolean {
    return (
      !!this.helpers.getErrors(this.error, this.control) &&
      this.control.touched &&
      this.control.invalid
    );
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.control.setValue(this.selectedItem[this.itemValue]);
  }

  toggle(): void {
    setTimeout(() => {
      this.showItems = !this.showItems;
    }, 200);
  }

  isInArray(item: any): boolean {
    if (Array.isArray(this.control.value)) {
      return this.control.value.some((el: any) => el === item.value);
    }
    return false;
  }

  setItem(item: any, index): void {
    const values = this.control.value || [];
    if (values.some((el: any) => el === item.value)) {
      values.splice(index, 1);
    } else {
      values.push(item.value);
    }
    this.control.setValue(values);
  }

  getText(id: number) {
    return this.items.find((item: any) => item[this.itemValue] === id) || "";
  }

  getValue(): string {
    if (!this.multiple) {
      return this.selectedItem[this.itemText];
    }

    if (Array.isArray(this.control.value)) {
      if (this.control.value.length === 1) {
        return this.getText(this.control.value[0])[this.itemText];
      }
      return `${this.getText(this.control.value[0])[this.itemText]} (+${
        this.control.value.length - 1
      } items)`;
    }
    return "";
  }
}

import { Injectable } from "@angular/core";
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from "ng-snotify";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  timeout = 3000;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = true;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;

  constructor(private snotifyService: SnotifyService) { }

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        // @ts-ignore
        filterDuplicates: this.filterDuplicates
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  onSuccess(message: string) {
    this.snotifyService.success(message, "Success", this.getConfig());
  }

  onInfo(message: string) {
    this.snotifyService.info(message, "Info", this.getConfig());
  }

  onError(message: string) {
    this.snotifyService.error(message, "Error", this.getConfig());
  }

  onWarning(message: string) {
    this.snotifyService.warning(message, "Warning", this.getConfig());
  }

  onConfirmation(message: string) {
    /*
    Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     */
    const { timeout, closeOnClick, ...config } = this.getConfig(); // Omit props what i don't need
    this.snotifyService.confirm(message, "Confirmation", {
      ...config,
      buttons: [
        { text: 'Yes', action: () => console.log('Clicked: Yes'), bold: false },
        { text: 'No', action: () => console.log('Clicked: No') },
        {
          text: 'Close',
          action: toast => {
            console.log('Clicked: Later');
            this.snotifyService.remove(toast.id);
          },
          bold: true
        }
      ]
    });
  }

  onPrompt(message: string) {
    /*
     Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     At the action of the first buttons we can get what user entered into input field.
     At the second we can't get it. But we can remove this toast
     */
    const { timeout, closeOnClick, ...config } = this.getConfig(); // Omit props what i don't need
    this.snotifyService
      .prompt(message, "Prompt", {
        ...config,
        buttons: [
          {
            text: 'Yes',
            action: toast => console.log('Said Yes: ' + toast.value)
          },
          {
            text: 'No',
            action: toast => {
              console.log('Said No: ' + toast.value);
              this.snotifyService.remove(toast.id);
            }
          }
        ]
      })
  }

  onClear() {
    this.snotifyService.clear();
  }

}

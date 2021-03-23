import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AccountService } from '@app/@core';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() hasRole: string[] | undefined;
  isVisible = false;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private accountService: AccountService) { }

  ngOnInit(): void {
    const korisnickeRole = this.accountService.decodedToken.role as Array<string>;

    if (!korisnickeRole) {
      this.viewContainerRef.clear();
    }
    if (this.accountService.checkRole(this.hasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}

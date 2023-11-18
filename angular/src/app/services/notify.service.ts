import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotifyService
{

  from  : string = "top";
  align : string = "right";


  /**
   * Constructor
   *
   * @param {ToastrService} _toastr
   */
  constructor(private _toastr: ToastrService)
  {}


  info( msg : string )
  {
    this._toastr.info( '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>', "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon mb-2",
        positionClass: "toast-" + this.from + "-" + this.align
      }
    );
  }


  success( msg : string )
  {
    this._toastr.success( '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>', "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon mb-2",
        positionClass: "toast-" + this.from + "-" + this.align
      }
    );
  }


  warning( msg : string )
  {
    this._toastr.warning( '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>', "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon mb-2",
        positionClass: "toast-" + this.from + "-" + this.align
      }
    );
  }


  error( msg : string )
  {
    this._toastr.error( '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>', "",
      {
        timeOut: 4000,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon mb-2",
        positionClass: "toast-" + this.from + "-" + this.align
      }
    );
  }


  show( msg : string )
  {
    this._toastr.show( '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>', "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon mb-2",
        positionClass: "toast-" + this.from + "-" + this.align
      }
    );
  }


}
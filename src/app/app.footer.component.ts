import {Component,OnInit,Input,Output} from "@angular/core";
var $=require('jquery');
@Component({
  selector:'app-footer',
  templateUrl:'./footer.component.html'
})
export class FooterComponent implements OnInit{

  // 友情链接，下拉框

  ngOnInit(){
    $(".m-select-box").on("click", ".label", function (e) {
      e.stopPropagation();
      e.cancelBubble = false;

      $(this).closest('.m-select-box').siblings('.m-select-box').find('ul').hide();
      $(this).next('ul').fadeToggle();

      $(document).on('click', function () {
        $('.m-select-box ul').hide();
      });
    });
  }

}

$(document).ready(function () {
  // -----------------------
  // share 按鈕定位（resize 才計算）
  // -----------------------
  function positionShareContainer() {
    var shareContainer = $('.TripMain-share');
    var shareBtn = $('.TripMain-shareBtn');
    var windowWidth = $(window).width();

    if (shareContainer.is(':visible')) {
      var btnPosition = shareBtn.offset();
      var btnWidth = shareBtn.outerWidth();
      var btnHeight = shareBtn.outerHeight();
      var containerWidth = shareContainer.outerWidth();

      if (windowWidth > 768) {
        shareContainer.css({
          'left': btnPosition.left + btnWidth/2 - containerWidth/2,
          'top': btnPosition.top + btnHeight + 10
        });
      } else {
        shareContainer.css({
          'left': btnPosition.left + btnWidth/2 - containerWidth/2 - 25,
          'top': btnPosition.top + btnHeight + 10
        });
      }
    }
  }

  $(window).resize(positionShareContainer);
  positionShareContainer(); // 頁面載入就計算一次

  // -----------------------
  // sticky 選單
  // -----------------------
  $("nav#TripNav").sticky({ topSpacing: 0 });

  // -----------------------
  // 選單指標點擊滾動
  // -----------------------
  $(".TripNav-list li").on("click", function (event) {
    event.preventDefault();
    var target = $(this).data("target");
    var scrollTop = $(window).width() > 768 ? $(target).position().top - 70 : $(target).position().top - 60;

    $("html, body").animate({ scrollTop: scrollTop }, 500);
  });

  // -----------------------
  // 天數指標點擊滾動
  // -----------------------
  $(".godays").on("click", function (event) {
    event.preventDefault();
    var target = $(this).data("target");
    var scrollTop = $(window).width() > 768 ? $(target).position().top - 100 : $(target).position().top - 80;

    $("html, body").animate({ scrollTop: scrollTop }, 500);
  });

  // -----------------------
  // scroll 事件整合：選單active + 天數active + 天數sticky
  // -----------------------
  var scrollTimeout;
  $(document).on("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      var scrollTop = $(document).scrollTop();

      // ---------- 選單active ----------
      $("section.section-target").each(function (index) {
        if (scrollTop <= 500) {
          $(".TripNav-list li").removeClass("active").eq(0).addClass("active");
        } else if ($(this).offset().top <= scrollTop + 150) {
          $(".TripNav-list li").removeClass("active").eq(index).addClass("active");
        }
      });

      // ---------- 天數active ----------
      $(".trip_day").each(function (index) {
        if (scrollTop <= 500) {
          $(".godays").removeClass("bt_active").eq(0).addClass("bt_active");
        } else if ($(this).offset().top <= scrollTop + 120) {
          $(".godays").removeClass("bt_active").eq(index).addClass("bt_active");
        }
      });

      // ---------- 天數sticky ----------
      var unstick_day_top = $("#unstick-day").position().top - 100;
      if (scrollTop >= unstick_day_top) {
        $("#trip_day_slider").unstick();
      } else {
        $("#trip_day_slider").sticky({ topSpacing: 60 });
      }

    }, 50); // debounce 延遲
  }).trigger("scroll"); // 頁面載入時也觸發一次
});


(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
$(function(){
    if($('.first-canvas').length){
        var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");
    
        canvas.height = document.body.offsetHeight;
        canvas.width = 175;
    
        var parts = [],
            minSpawnTime = 40,
            lastTime = new Date().getTime(),
            maxLifeTime = Math.min(5000, (canvas.height/(1.5*60)*1000)),
            emitterX = canvas.width / 2,
            emitterY = canvas.height - 10,
            smokeImage = new Image();
    
        function spawn() {
            if (new Date().getTime() > lastTime + minSpawnTime) {
                lastTime = new Date().getTime();
                parts.push(new smoke(emitterX, emitterY));
            }
        }
    
        function render() {
            var len = parts.length;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            while (len--) {
                if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
                    parts.splice(len, 1);
                } else {
                    parts[len].update();
    
                    ctx.save();
                    var offsetX = -parts[len].size/2,
                        offsetY = -parts[len].size/2;
                
                    ctx.translate(parts[len].x-offsetX, parts[len].y-offsetY);
                    ctx.rotate(parts[len].angle / 180 * Math.PI);
                    ctx.globalAlpha  = parts[len].alpha;
                    ctx.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
                    ctx.restore();
                }
            }
            spawn();
            requestAnimationFrame(render);
        }
    
        function smoke(x, y, index) {
            this.x = x;
            this.y = y;
    
            this.size = 1;
            this.startSize = 52;
            this.endSize = 50;
    
            this.angle = Math.random() * 359;
    
            this.startLife = new Date().getTime();
            this.lifeTime = 0;
    
            this.velY = -1 - (Math.random()*0.5);
            this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
        }
    
        smoke.prototype.update = function () {
            this.lifeTime = new Date().getTime() - this.startLife;
            this.angle += 0.2;
            
            var lifePerc = ((this.lifeTime / maxLifeTime) * 100);
    
            this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);
    
            this.alpha = 1 - (lifePerc * .01);
            this.alpha = Math.max(this.alpha,0);
            
            this.x += this.velX;
            this.y += this.velY;
        }
    
        smokeImage.src = $('.first-canvas img').attr('src');
        smokeImage.onload = function () {
            render();
        }
    
    
        window.onresize = resizeMe;
        window.onload = resizeMe;
        function resizeMe() {
        canvas.height = document.body.offsetHeight;
        }
    }
    if($('.dim').length){
        var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");
    
        canvas.height = document.body.offsetHeight;
        canvas.width = 300;
    
        var parts = [],
            minSpawnTime = 40,
            lastTime = new Date().getTime(),
            maxLifeTime = Math.min(5000, (canvas.height/(1.5*60)*1000)),
            emitterX = canvas.width / 2,
            emitterY = canvas.height - 10,
            smokeImage = new Image();
    
        function spawn() {
            if (new Date().getTime() > lastTime + minSpawnTime) {
                lastTime = new Date().getTime();
                parts.push(new smoke(emitterX, emitterY));
            }
        }
    
        function render() {
            var len = parts.length;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            while (len--) {
                if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
                    parts.splice(len, 1);
                } else {
                    parts[len].update();
    
                    ctx.save();
                    var offsetX = -parts[len].size/2,
                        offsetY = -parts[len].size/2;
                
                    ctx.translate(parts[len].x-offsetX, parts[len].y-offsetY);
                    ctx.rotate(parts[len].angle / 180 * Math.PI);
                    ctx.globalAlpha  = parts[len].alpha;
                    ctx.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
                    ctx.restore();
                }
            }
            spawn();
            requestAnimationFrame(render);
        }
    
        function smoke(x, y, index) {
            this.x = x;
            this.y = y;
    
            this.size = 1;
            this.startSize = 12;
            this.endSize = 20;
    
            this.angle = Math.random() * 359;
    
            this.startLife = new Date().getTime();
            this.lifeTime = 0;
    
            this.velY = -1 - (Math.random()*0.5);
            this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
        }
    
        smoke.prototype.update = function () {
            this.lifeTime = new Date().getTime() - this.startLife;
            this.angle += 0.2;
            
            var lifePerc = ((this.lifeTime / maxLifeTime) * 100);
    
            this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);
    
            this.alpha = 1 - (lifePerc * .01);
            this.alpha = Math.max(this.alpha,0);
            
            this.x += this.velX;
            this.y += this.velY;
        }
    
        smokeImage.src = $('.dim img').attr('src');
        smokeImage.onload = function () {
            render();
        }
    
    
        window.onresize = resizeMe;
        window.onload = resizeMe;
        function resizeMe() {
        canvas.height = document.body.offsetHeight;
        }
    }
    

    if($('#pie').length){
        function pieSlicer() {
            var percentValue = (utilslider.value / 100) * circumference;
                  pie.style.strokeDasharray = percentValue + " " + circumference;
                      pie.style.stroke = "hsl(0 ," + utilslider.value + "%, 50%)";
                      percentDisplay.innerHTML = utilslider.value + "%";
        }
          
          var utilslider = document.getElementById("utilslider"),
          circle = document.getElementById("pie"),
          radius = parseInt(circle.getAttribute('r'), 10),
          circumference = 2 * radius * Math.PI,
          percentDisplay = document.querySelector("#readout output");
              utilslider.addEventListener("input", 
                  function() { pieSlicer(); }
              )
        pieSlicer();
    }
    

    $('.info__item.slide .slide').on('click', function(){
        $(this).toggleClass('active')
        $('.info-text__wrap').slideToggle()
    })

    $('.burger').click(function(){
        $('.sidebar').addClass('active')
    })
    $('.sidebar__close').click(function(){
        $('.sidebar').removeClass('active')
    })
    $('.info-control').click(function(){
        $('.info').toggleClass('active')
    })

    // const element = document.getElementById('map')
    // const panzoom = Panzoom(element, {
    //     $zoomIn: $(".zoom-in"),
    //     $zoomOut: $(".zoom-out"),
    //     contain: 'inside' 
    // });
    
   
    // if($('#map').length){
    //     $('#map').smartZoom({
    //         'containerClass':'map__wrap',
    //         'maxScale' : 2,
    //     });
    //     $('#zoomInButton,#zoomOutButton').bind("click", zoomButtonClickHandler);
    //     function zoomButtonClickHandler(e){
    //         var scaleToAdd = 0.8;
    //         if(e.target.id == 'zoomOutButton')
    //             scaleToAdd = -scaleToAdd;
    //         $('#map').smartZoom('zoom', scaleToAdd);
    //     }  
    // }
      
    
    $('.punkt__select input').focus(function(){
        $(this).closest('.punkt__select').addClass('active')
    })
    $('.punkt__select input').blur(function(){
        $('.punkt__select').removeClass('active')
    })
    $('.punkt__select .punkt__select__arr').click(function(){
        $(this).closest('.punkt__select').toggleClass('active')
    })

    $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $(".punkt__select"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.punkt__select').removeClass('active')
        }
    });

    $('.vibor-btn').click(function(){
        $('.modal-vibor').addClass('active')
    })
    $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $(".modal-vibor__wrap"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.modal-vibor').removeClass('active')
        }
    });

    $('.modal-close').click(function(){
        $(this).closest('.modal-vibor').removeClass('active')
    })

    $('.vibor-delete').click(function(){
        $(this).parent().fadeOut(200)
        setTimeout(function(){
            $(this).parent().remove()
        })
    })

    $('.prof-card-more').click(function(){
        $(this).toggleClass('active')
        $(this).parent('.prof-card__content').find('.check-more').slideToggle()
    })

    // ярмарка
    $('.yrmakrka__more').click(function(){
        $('.yrmakrka__block').toggleClass('active')
        $('.yrmakrka__info').toggleClass('active')
    })


    //админ
    $('.admin-punk__li__right button').click(function(){
        $('.modal-vibor.admin').addClass('twomodal')
    })

    $('.employees-item__more').click(function(){
        $(this).closest('.employees-item').toggleClass('active')
    })
    
    $('.sort').click(function(){
        $('.yrmakrka__filter').slideToggle()
    })
   

    $('.yr__item .icon-arrow').click(function(){
        $(this).closest('.yr__item').toggleClass('active')
    })

    $('.comment__btn').click(function(){
        $(this).closest('.comment').toggleClass('active').find('.comment__wrap').slideToggle()
    })

    if($('.custom-select').length){
        $('.custom-select').selectric();
    }
})
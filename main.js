document.addEventListener('DOMContentLoaded', () => {
        //TODO: Completa el codi per tal que la hipo es mogui amb el ratolí i teclat
        //      Una vegada la caixaVermella toqui la blava, haurem guanyat si detectem la col·lisió!
        var pantalla = document.querySelector("#pantalla");
        var hipo = document.querySelector(".hipo");
        var h1 = document.createElement("h1")

        var puntos = 0;
        var qttBalls = 20;

        hipo.style.top = 35 + "vh";
        hipo.style.left = 45 + "vw";

       generateBalls()
       //const time = setTimeout(generateBalls,500)

        function generateBalls()
        {
            let boles = []

            for(let i = 0; i < qttBalls; i++)
            {
                var divBolas = document.createElement("div")
             
                var numColor = parseInt(Math.random() * (4  - 1 + 1) + 1);
                var tamaño = parseInt(Math.random() * (150 - 50 + 1) + 50);

                var x = parseInt(Math.random() * ((pantalla.clientWidth - tamaño) - 0) + 0)
                var y = parseInt(Math.random() * ((pantalla.clientHeight - tamaño) - 0) + 0)
 
                //cambia color bolas
                if(numColor == 1) divBolas.style.backgrounColor = "red";
                else if(numColor == 2) divBolas.style.backgroundColor ="blue"
                else if(numColor == 3) divBolas.style.backgroundColor = "yellow"
                else if(numColor == 4) divBolas.style.backgroundColor = "green"
                
                //cambia el tmaño de las bolas
                divBolas.style.width = tamaño + "px"
                divBolas.style.height = tamaño + "px"
               
                divBolas.style.top = y  + "px"
                divBolas.style.left = x + "px"
                
                divBolas.classList.add("ball")                
                pantalla.appendChild(divBolas);
            }
            
            //Retornem la llista de boles generades (la farem servir després)
            return boles;
        }

        //saber cuantas amarillas hay
        var yellow = document.querySelectorAll(".ball")
        var qttAmarillas = 0;
        
        for(let a = 0; a < qttBalls; a ++)
        {
            if(yellow[a].style.backgroundColor == "yellow") qttAmarillas++;
            //console.log(qttAmarillas)
        }

       // alert(qttAmarillas)

        function detectarVentana()
        {
            if(hipo.offsetLeft < 0) 
            {
                hipo.style.left = 0;
            }
            
            if(hipo.offsetTop < 0)  
            {
                hipo.style.top  = 0;
            }
            
            if(hipo.offsetTop+hipo.clientHeight > pantalla.clientHeight) 
            {
                hipo.style.top  = (pantalla.clientHeight - hipo.clientHeight) + "px";
            }
            
            if(hipo.offsetLeft+hipo.clientWidth > pantalla.clientWidth)
            {
                hipo.style.left = (pantalla.clientWidth - hipo.clientWidth) + "px";
            }
        }
        
        var bolas = document.querySelectorAll(".ball")
        
        function detectarXoc()
        {
            for(var i = 0; i < qttBalls; i ++)
            {
                if( (hipo.offsetTop < bolas[i].offsetTop + bolas[i].clientHeight) && 
                    (hipo.offsetTop + hipo.clientHeight > bolas[i].offsetTop) &&
                    (hipo.offsetLeft + hipo.clientWidth > bolas[i].offsetLeft) &&
                    (hipo.offsetLeft < bolas[i].offsetLeft + bolas[i].clientWidth))
                {
                    if(bolas[i].style.backgroundColor == "yellow")
                    {
                        qttAmarillas--;
                        puntos ++;
                        //alert(puntos)
                    }
                    else
                    {
                        puntos--;
                        //alert(puntos)
                    }

                    bolas[i].remove();
                }  
                detectarVentana();
            }  
        }

        window.addEventListener('mousemove', function(ev)
        {                  
            const offsetX = hipo.clientWidth/2;
            const offsetY = hipo.clientHeight/2;

            hipo.style.top = ev.clientY - offsetY + "px";
            hipo.style.left = ev.clientX - offsetX + "px";
            //console.log("Ratolí mogut --> X:" + ev.clientX + " Y:" + ev.clientY);

            if(qttAmarillas == 0)
            {
                if(puntos > 0) 
                {
                    h1.innerHTML = "Victory! <br>Puntuació: " + puntos
                    pantalla.appendChild(h1)
                    hipo.remove()

                    for(var i = 0; i < qttBalls; i ++)
                    {
                        bolas[i].remove()
                    } 
                    setTimeout(location.reload.bind(location), 5000);
                }
                else
                {
                    h1.innerHTML = "Game Over! <br>Puntuació: " + puntos
                    pantalla.appendChild(h1)
                    
                    hipo.remove()

                    for(var i = 0; i < qttBalls; i ++)
                    {
                        bolas[i].remove()
                    }
                    setTimeout(location.reload.bind(location), 5000);              
                }
            }

            detectarXoc();  
            detectarVentana();          
        });
         

    },false);
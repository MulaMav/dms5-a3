
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".qa-container");

    function handleScroll() {
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

//These codes down are wrote by Chatgpt
document.addEventListener("DOMContentLoaded", function () {
    const { Engine, Render, World, Bodies, Runner } = Matter;

    
    const engine = Engine.create();
    const world = engine.world;

  
    const runner = Runner.create();
    Runner.run(runner, engine);

    
    const mainContent = document.getElementById("main-content");
    const fallingContainer = document.getElementById("falling-objects-container");

    const windowHeight = window.innerHeight;
    const bottomY = windowHeight - 10;

    const ground = Bodies.rectangle(window.innerWidth / 5, bottomY, window.innerWidth, 20, {
        isStatic: true,
        restitution: 8, 
        render: { visible: false }
    });
    World.add(world, ground);

    
    document.querySelector("header").addEventListener("mouseenter", function () {
        dropObject();
    });
  
    document.querySelector("body").addEventListener("mouseenter", function () {
        dropObject();
    });
    document.querySelector("body").addEventListener("mousehover", function () {
        dropObject();
    });

   
    function dropObject() {
        const randomX = Math.random() * window.innerWidth;
        const shapeType = Math.random() > 0.5 ? "circle" : "rectangle";
        let newObject, domElement;

        if (shapeType === "circle") {
            newObject = Bodies.circle(randomX, 100, 20, {
                restitution: 1.2,
                render: { visible: false }
            });

            domElement = document.createElement("div");
            domElement.classList.add("falling-object", "circle");
        } else {
            newObject = Bodies.rectangle(randomX, 100, 40, 40, {
                restitution: 0.8,
                render: { visible: false }
            });

            domElement = document.createElement("div");
            domElement.classList.add("falling-object", "rectangle");
        }

       
        newObject.domElement = domElement;
        fallingContainer.appendChild(domElement);
        World.add(world, newObject);

        
        Matter.Events.on(engine, "afterUpdate", function () {
            if (newObject.domElement) {
                const { x, y } = newObject.position;
                newObject.domElement.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }

    window.addEventListener("resize", function () {
        Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: bottomY });
        Matter.Body.setVertices(ground, [
            { x: 0, y: bottomY },
            { x: window.innerWidth, y: bottomY },
            { x: window.innerWidth, y: windowHeight },
            { x: 0, y: windowHeight }
        ]);
    });
});

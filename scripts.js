const pauseAllVideos = (e) => {
    var vids = document.getElementsByClassName("video-play");
    for (let i = 0; i < vids.length; i++) {
        vids[i].pause();
    }
}
const vidnames = ["Selma","Bilan","Tharahai","Yousra","Samantha","Jonila",
    "Angelica","Stefani","Marie-Claire","Thamira","Gracia","Helin","Iman",
    "Thida","Michelle","Isabel","Vera","Melanie","Dania"
]
const somelinks = [
    "https://www.instagram.com/bjerkedanserevy_2025?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "https://www.instagram.com/bjerke.vgs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "https://www.instagram.com/bjerketoppidrett_dans/?utm_source=ig_web_button_share_sheet"
]
var scrollToTop = [] //Frames som må scrolles til toppen
var numDancerVid = vidnames.length;
var currentFrame;
var frameIndex;
var frameWidth = Math.max(
    document.documentElement["clientWidth"],
    document.body["scrollWidth"],
    document.documentElement["scrollWidth"],
    document.body["offsetWidth"],
    document.documentElement["offsetWidth"]
); 
window.addEventListener("load", (e) => {
    /*------ Scrolling mellom hovedmoduler ------ */
    var mc = document.getElementById("main-content");
    var cc = document.getElementsByClassName("content-container");
    currentFrame = 1;
    mc.scrollLeft = frameWidth;
    mc.addEventListener("scroll", () => {
        clearTimeout(mc.scrollTimeout); /* Fjern forrige timeout for å unngå multi-prosesser */
        /* Setter en timeout for å sjekke scroll-posisjon etter scrolling */
        mc.scrollTimeout = setTimeout(() => {
            let scrollPosition = mc.scrollLeft; /* Finn horisontal posisjon */
            frameWidth = Math.max(
                document.documentElement["clientWidth"],
                document.body["scrollWidth"],
                document.documentElement["scrollWidth"],
                document.body["offsetWidth"],
                document.documentElement["offsetWidth"]
            );    
            let nearestFrame = Math.round(scrollPosition / frameWidth) * frameWidth /* Finn posisjon nærmeste ramme */
            frameIndex = Math.round(scrollPosition / frameWidth);
            if (frameIndex !== currentFrame) {
                currentFrame = frameIndex;
                /* Pause videoer hvis de er på */
                pauseAllVideos();
                for (let i = 0; i < cc.length; i++) {
                    cc[i].scrollTop = 0;
                }
                /* Scroll til toppen */
                //cc[currentFrame].scrollTop = 0;
            }
            var ns = document.getElementsByClassName("nav-circle");
            for (let i = 0; i < ns.length; i++) {
                if (i == currentFrame) {
                    ns[i].style.backgroundColor = "rgb(184,66,90)";
                }
                else {
                    ns[i].style.backgroundColor = "rgb(0,0,0)";
                }
            }
            /* Scroll jevnt over til nærmeste ramme */
            mc.scrollTo({
                left: nearestFrame,
                behavior: "smooth"
            });
        }, 100); /* 100ms forsinkelse etter scrolling for å beregne endelig posisjon */  
    });
    /*------- Video -------*/
    var dc = document.getElementById("dancer-container");
    for (let i = 0; i < numDancerVid; i++) {
        div = document.createElement("div");
        div.setAttribute("class","video-container");
        div.setAttribute("id", "v"+i)
        h2 = document.createElement("h2");
        h2.innerHTML = vidnames[i];
        img = document.createElement("img");
        img.setAttribute("class", "video-thumbnail");
        img.setAttribute("id","danser-"+i+"-thumbnail");
        img.setAttribute("src","./images/danser_"+i+".png");
        dc.appendChild(div);
        div.appendChild(h2);
        div.appendChild(img); 
        img.addEventListener("click", (e) => {
            pauseAllVideos();
            /* Lag video-element og erstatt thumbnail med dette*/
            var video = document.createElement("video");
            video.setAttribute("controls", "");
            video.setAttribute("class","video-play")
            var source = document.createElement("source");
            source.setAttribute("src","./video/danser_"+i+".mp4");
            source.setAttribute("type","video/MP4");
            video.appendChild(source);
            e.target.style.display = "none";
            e.target.parentElement.appendChild(video);
            /*   KANSKJE???? */
            video.play();
        });
    }
    /* Some-bilde-linker */
    nc = document.getElementsByClassName("some-nav-container");
    si = document.getElementsByClassName("some-img");
    for (let i = 0; i < nc.length; i++) {
        nc[i].addEventListener("click", () => {
            window.open(somelinks[i])
        })
        // si[i].addEventListener("click", () => {
        //     window.open(somelinks[i])
        // });
    }   
});

setTimeout(() => {
    document.getElementById("main-content").style.color = "rgb(184,66,90)";
}, 270);

/*
numFrames = 4
window.addEventListener("load", (e) => {
    console.log("Page loaded")
    //Finner bredden på siden
    winWidth = Math.max(
        document.documentElement["clientWidth"],
        document.body["scrollWidth"],
        document.documentElement["scrollWidth"],
        document.body["offsetWidth"],
        document.documentElement["offsetWidth"]
    );    
    //Endrer størrelsen på main-content til å være antall frames ganger bredde
    document.getElementById("main-content").style.width = numFrames*winWidth + "px"
    var content = document.getElementsByClassName("content-container");
    for (let i = 0; i < content.length; i++) {
        content[i].style.width = winWidth + "px"
    }

});
*/


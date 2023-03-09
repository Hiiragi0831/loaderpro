import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const items = document.querySelectorAll(".intro__facts-num");
export const animate = () => {
    items.forEach((el) => {
        let num = el.innerHTML
        el.innerHTML = "0"
        ScrollTrigger.create({
            trigger: el,
            start: "top 50%",
            invalidateOnRefresh: true,
            scrub: true,
            markers: true,
            once: true,
            onEnter: () => {
                gsap.to(el, {
                    innerText: num,
                    // textContent: 0,
                    duration: 2,
                    ease: "power1.in",
                    snap: { innerText: 1 },
                });
            }
        });
    });
}

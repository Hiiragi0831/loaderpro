import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const items = document.querySelectorAll(".intro__facts-num");
const nums = [];
export const animate = () => {
    items.forEach((el) => {
        nums.push(el.innerHTML);
        el.innerHTML = "0"
    });

    ScrollTrigger.create({
        trigger: document.querySelector('.intro__facts'),
        start: "top 50%",
        invalidateOnRefresh: true,
        // scrub: true,
        // markers: true,
        once: true,
        onEnter: () => {
            items.forEach((el, key) => {
                gsap.to(el, {
                    innerText: nums[key],
                    duration: 2,
                    ease: "power1.in",
                    snap: { innerText: 1 },
                });
            });
        }
    });
}

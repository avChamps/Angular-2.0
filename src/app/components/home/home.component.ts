import {
  Component,
  ElementRef,
  HostListener,
  AfterViewInit,
  ViewChild,
  Renderer2,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { ContactUs, updateProfile } from '../../constants/api-constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {
  contactForm!: FormGroup;
  submitted = false;
  items = Array(3).fill(null);
  private clickListener!: () => void;
  private scrollListener!: () => void;

  constructor(private renderer: Renderer2, private el: ElementRef, private fb: FormBuilder, private http: HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      Name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(34)
      ])],
      EmailId: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ])],
      Subject: [''],
      Message: ['']
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  @ViewChild('hamburger') hamburger!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('servicesCards', { static: false }) servicesCards!: ElementRef;
  @ViewChild('testimonialsSwiper', { static: false }) testimonialsSwiper!: ElementRef;

  menuOpen = false;
  lastScrollY = 0;

  ngAfterViewInit(): void {
    this.animateHero();
    this.setupHamburger();
    this.setupTooltips();
    this.animateSweep('.sweep-left', 120);
    this.animateSweep('.sweep-right', -120);
    this.setupJoinCommunityTooltip();
    this.setupComingSoonButtons();
    this.animateServices();
    this.setupTestimonialsSwiper();
    this.animateTestimonials();
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.contact_details', {
      scrollTrigger: {
        trigger: '.contact_wrapper',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });

    gsap.from('.contact_form', {
      scrollTrigger: {
        trigger: '.contact_wrapper',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
    this.clickListener = this.renderer.listen('document', 'click', (e) => {
      const btn = e.target.closest('.comingSoonBtn');
      this.hideAllTooltips();

      if (btn) {
        e.preventDefault();
        const id = btn.dataset.tooltipId;
        const tooltip = document.getElementById(`comingSoonTooltip-${id}`);
        if (tooltip) {
          tooltip.classList.add('show');
          setTimeout(() => tooltip.classList.remove('show'), 3000);
        }
      }
    });

    // Scroll-to-top visibility
    this.scrollListener = this.renderer.listen('window', 'scroll', () => {
      const scrollBtn = this.el.nativeElement.querySelector('#scrollToTopBtn');
      if (window.scrollY > 300) {
        scrollBtn?.classList.add('visible');
      } else {
        scrollBtn?.classList.remove('visible');
      }
    });
  }

  // Animate hero section
  animateHero(): void {
    const tl = gsap.timeline();

    tl.from('.hero_container', { opacity: 0, y: 30, duration: 0.5, ease: 'power3.out' })
      .from('.hero_title', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.hero_text', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.hero_buttons', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .fromTo('.button-scroll-down',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to('.button-scroll-down', {
              y: 10,
              duration: 1,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
            });
          },
        }
      );
  }

  // Setup hamburger toggle
  setupHamburger(): void {
    this.hamburger.nativeElement.addEventListener('click', () => {
      this.menuOpen = !this.menuOpen;
      this.mobileMenu.nativeElement.classList.toggle('show', this.menuOpen);
      this.hamburger.nativeElement.classList.toggle('open', this.menuOpen);
      this.overlay.nativeElement.style.display = this.menuOpen ? 'block' : 'none';
    });
  }

  // Animate sweep lines
  animateSweep(selector: string, xOffset: number): void {
    gsap.to(selector, {
      x: xOffset,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }

  // Tooltips
  setupTooltips(): void {
    const triggers = document.querySelectorAll('.tooltipTrigger');
    triggers.forEach((trigger) => {
      const wrapper = trigger.closest('.coming_soon_wrapper');
      const tooltip = wrapper?.querySelector('.coming_soon_message') as HTMLElement;

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        document.querySelectorAll('.coming_soon_message.show').forEach((t) => {
          if (t !== tooltip) t.classList.remove('show');
        });

        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 4000);
      });
    });
  }

  // Join community tooltip
  setupJoinCommunityTooltip(): void {
    const btn = document.querySelector('#comingSoonBtnJoinCommunity button');
    const tooltip = document.getElementById('comingSoonTooltip-join-community');

    if (btn && tooltip) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
      });
    }
  }

  // Handle outside clicks
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      this.menuOpen &&
      !this.mobileMenu.nativeElement.contains(target) &&
      !this.hamburger.nativeElement.contains(target)
    ) {
      this.menuOpen = false;
      this.mobileMenu.nativeElement.classList.remove('show');
      this.hamburger.nativeElement.classList.remove('open');
      this.overlay.nativeElement.style.display = 'none';
    }

    document.querySelectorAll('.coming_soon_message.show').forEach((t) => {
      t.classList.remove('show');
    });
  }

  // Header scroll behavior
  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScroll = window.scrollY;
    if (currentScroll < this.lastScrollY) {
      this.header.nativeElement.classList.add('header--visible');
      this.header.nativeElement.classList.remove('header--hidden');
    } else {
      this.header.nativeElement.classList.add('header--hidden');
      this.header.nativeElement.classList.remove('header--visible');
    }
    this.lastScrollY = currentScroll;
  }

  setupComingSoonButtons(): void {
    document.addEventListener('click', (e: any) => {
      const btn = e.target.closest('.comingSoonBtn');
      if (btn) {
        e.preventDefault();

        const id = btn.dataset.tooltipId;

        document.querySelectorAll('.coming_soon_message.show').forEach((tooltip) => {
          tooltip.classList.remove('show');
        });

        const tooltip = document.getElementById(`comingSoonTooltip-${id}`);
        if (tooltip) {
          tooltip.classList.add('show');
          setTimeout(() => {
            tooltip.classList.remove('show');
          }, 4000);
        }
      }
    });
  }

  animateServices(): void {
    gsap.from('.services_cards', {
      scrollTrigger: {
        trigger: '.services_cards',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }

  setupTestimonialsSwiper(): void {
    const swiper = new Swiper('.testimonials_swiper', {
      spaceBetween: 24,
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.custom-swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 1.5 },
        1024: { slidesPerView: 3 },
      },
      on: {
        init: this.highlightActiveCard,
        slideChangeTransitionEnd: this.highlightActiveCard,
      },
    });
  }

  highlightActiveCard(): void {
    const allCards = document.querySelectorAll('.testimonials_card');
    allCards.forEach((card) => card.classList.remove('active'));

    const activeSlide = document.querySelector('.swiper-slide-active .testimonials_card');
    if (activeSlide) {
      activeSlide.classList.add('active');
    }
  }

  animateTestimonials(): void {
    gsap.from('.testimonials_swiper', {
      scrollTrigger: {
        trigger: '.testimonials_swiper',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  hideAllTooltips(): void {
    const visibleTooltips = this.el.nativeElement.querySelectorAll(
      '.coming_soon_message.show'
    );
    visibleTooltips.forEach((el: HTMLElement) =>
      el.classList.remove('show')
    );
  }

  ngOnDestroy(): void {
    if (this.clickListener) this.clickListener();
    if (this.scrollListener) this.scrollListener();
  }





  submitForm() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const formData = this.contactForm.value;
    this.http.post(ContactUs, formData).subscribe({
      next: (response: any) => {
        this.submitted = false;
      },
      error: (error) => {
        this.submitted = false;
      }
    });
  }


  onNavigation(url : any) {
    this.router.navigate([url]);
  }

}

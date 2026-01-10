class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <footer>
        
        <!-- United by socks pre-footer -->
        <div class="relative w-full py-40 overflow-x-clip">
            <!-- Large mid left heart -->
            <img class="absolute left-0 top-0 w-1/2 -translate-x-1/2 -translate-y-1/6"
                srcset="/static/images/3DSock.png, /static/images/3DSock.png 2x" alt="" />
            <!-- Large mid right heart -->
            <img class="absolute right-0 bottom-0 w-1/2 translate-x-1/2 translate-y-1/6"
                srcset="/static/images/3DSock.png, /static/images/3DSock.png 2x" alt="" />
            <!-- Small bottom left heart -->
            <!--<img class="absolute blur-sm left-10 top-0 w-1/8 translate-x-1/2"
                srcset="/static/images/3DSock.png, /static/images/3DSock.png 2x" alt="" />-->
            <!-- Small top right heart -->
            <img class="absolute blur-lg right-1/6 top-6 w-1/5"
                srcset="/static/images/3DSock.png, /static/images/3DSock.png 2x" alt="" />
            <img class="absolute left-0 right-0 mx-auto self-center h-10 md:h-20" src="/static/images/UnitedBySocks.svg"/>
        </div>

        <!-- Main footer nav -->
        <div class="text-white text-sm wrapper">

            <div class="grid-system">
                <div class="col-span-12 flex flex-col md:flex-row justify-between">

                    <nav class="footer-accordion-toggle md:col-span-2 md:block mb-0.5 bg-black/40 md:bg-transparent"
                        role="navigation" aria-label="Company navigation">
                        <div class="relative">
                            
                            <input type="checkbox" id="footer-section-footer-section-1" class="peer hidden"aria-hidden="true" />
                            
                            <label for="footer-section-footer-section-1" class="block p-1.5 md:p-0 cursor-pointer md:cursor-default md:pointer-events-none" role="button" aria-expanded="false" aria-controls="footer-content-footer-section-1" tabindex="0">
                                <h6 class="text-sm md:text-xl">Contest</h6>
                            </label>
                            
                            <span class="hidden max-md:block peer-checked:max-md:hidden bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-plus"></use>
                                </svg>
                            </span>
                            <span class="hidden peer-checked:max-md:block bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-minus"></use>
                                </svg>
                            </span>
                            
                            <div id="footer-content-1" class="px-1.5 pb-1.5 md:p-0 md:mt-3 max-md:hidden max-md:max-h-0 max-md:overflow-hidden max-md:transition-all max-md:duration-300 peer-checked:max-md:block peer-checked:max-md:max-h-screen space-y-2" role="region" aria-labelledby="footer-section-1">

                                <a href="/pssc/hohenried-2026" class="block text-xs underline-hover" tabindex="0">Pinke Socke Song Contest</a>

                                <a href="/pssc/history" class="block text-xs underline-hover">History of the PSSC</a>
                            </div>

                        </div>
                    </nav>

                    <nav class="footer-accordion-toggle md:col-span-2 md:block mb-0.5 bg-black/40 md:bg-transparent"
                        role="navigation" aria-label="Company navigation">
                        <div class="relative">
                            
                            <input type="checkbox" id="footer-section-footer-section-2" class="peer hidden"aria-hidden="true" />
                            
                            <label for="footer-section-footer-section-2" class="block p-1.5 md:p-0 cursor-pointer md:cursor-default md:pointer-events-none" role="button" aria-expanded="false" aria-controls="footer-content-footer-section-2" tabindex="0">
                                <h6 class="text-sm md:text-xl">Newsroom</h6>
                            </label>
                            
                            <span class="hidden max-md:block peer-checked:max-md:hidden bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-plus"></use>
                                </svg>
                            </span>
                            <span class="hidden peer-checked:max-md:block bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-minus"></use>
                                </svg>
                            </span>
                            
                            <div id="footer-content-1" class="px-1.5 pb-1.5 md:p-0 md:mt-3 max-md:hidden max-md:max-h-0 max-md:overflow-hidden max-md:transition-all max-md:duration-300 peer-checked:max-md:block peer-checked:max-md:max-h-screen space-y-2" role="region" aria-labelledby="footer-section-2">

                                <a href="/#stories" class="block text-xs underline-hover" tabindex="0">Newsroom</a>

                                <a href="/faqs" class="block text-xs underline-hover">FAQ</a>

                            </div>

                        </div>
                    </nav>

                    <nav class="footer-accordion-toggle md:col-span-3 md:block mb-0.5 bg-black/40 md:bg-transparent"
                        role="navigation" aria-label="Company navigation">
                        <div class="relative">
                            
                            <input type="checkbox" id="footer-section-footer-section-3" class="peer hidden"aria-hidden="true" />
                            
                            <label for="footer-section-footer-section-3" class="block p-1.5 md:p-0 cursor-pointer md:cursor-default md:pointer-events-none" role="button" aria-expanded="false" aria-controls="footer-content-footer-section-3" tabindex="0">
                                <h6 class="text-sm md:text-xl">🧦</h6>
                            </label>
                            
                            <span class="hidden max-md:block peer-checked:max-md:hidden bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-plus"></use>
                                </svg>
                            </span>
                            <span class="hidden peer-checked:max-md:block bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-minus"></use>
                                </svg>
                            </span>
                            
                            <div id="footer-content-1" class="px-1.5 pb-1.5 md:p-0 md:mt-3 max-md:hidden max-md:max-h-0 max-md:overflow-hidden max-md:transition-all max-md:duration-300 peer-checked:max-md:block peer-checked:max-md:max-h-screen space-y-2" role="region" aria-labelledby="footer-section-3">

                                <a href="#" class="block text-xs underline-hover" tabindex="0"><3</a>

                            </div>

                        </div>
                    </nav>

                    <nav class="footer-accordion-toggle md:col-span-3 md:block mb-0.5 bg-black/40 md:bg-transparent"
                        role="navigation" aria-label="Company navigation">
                        <div class="relative">
                            
                            <input type="checkbox" id="footer-section-footer-section-4" class="peer hidden"aria-hidden="true" />
                            
                            <label for="footer-section-footer-section-4" class="block p-1.5 md:p-0 cursor-pointer md:cursor-default md:pointer-events-none" role="button" aria-expanded="false" aria-controls="footer-content-footer-section-4" tabindex="0">
                                <h6 class="text-sm md:text-xl">🌈</h6>
                            </label>
                            
                            <span class="hidden max-md:block peer-checked:max-md:hidden bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-plus"></use>
                                </svg>
                            </span>
                            <span class="hidden peer-checked:max-md:block bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-minus"></use>
                                </svg>
                            </span>
                            
                            <div id="footer-content-4" class="px-1.5 pb-1.5 md:p-0 md:mt-3 max-md:hidden max-md:max-h-0 max-md:overflow-hidden max-md:transition-all max-md:duration-300 peer-checked:max-md:block peer-checked:max-md:max-h-screen space-y-2" role="region" aria-labelledby="footer-section-4">

                                <a href="#" class="block text-xs underline-hover" tabindex="0"><3</a>

                            </div>

                        </div>
                    </nav>

                    <nav class="footer-accordion-toggle md:col-span-3 md:block mb-0.5 bg-black/40 md:bg-transparent" role="navigation" aria-label="Company navigation">
                        <div class="relative">
                            
                            <input type="checkbox" id="footer-section-footer-section-5" class="peer hidden"aria-hidden="true" />
                            
                            <label for="footer-section-footer-section-5" class="block p-1.5 md:p-0 cursor-pointer md:cursor-default md:pointer-events-none" role="button" aria-expanded="false" aria-controls="footer-content-footer-section-5" tabindex="0">
                                <h6 class="text-sm md:text-xl">🧸</h6>
                            </label>
                            
                            <span class="hidden max-md:block peer-checked:max-md:hidden bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-plus"></use>
                                </svg>
                            </span>
                            <span class="hidden peer-checked:max-md:block bg-accent rounded-full pointer-events-none absolute right-1.5 top-1.5" aria-hidden="true">
                                <svg class="" width="24" height="24" aria-hidden="true">
                                    <use href="#svg-minus"></use>
                                </svg>
                            </span>
                            
                            <div id="footer-content-5" class="px-1.5 pb-1.5 md:p-0 md:mt-3 max-md:hidden max-md:max-h-0 max-md:overflow-hidden max-md:transition-all max-md:duration-300 peer-checked:max-md:block peer-checked:max-md:max-h-screen space-y-2" role="region" aria-labelledby="footer-section-5">

                                <a href="#" class="block text-xs underline-hover" tabindex="0"><3</a>

                            </div>

                        </div>
                    </nav>

                </div>
            </div>

        </div>
        
        <div class="text-white text-sm wrapper"></div>
        
        <div class="my-9 md:my-10" role="region" aria-label="Partners section">
            <h6 class="wrapper text-sm md:text-xl mb-1.5 md:mb-3">Partners</h6>
            <div class="wrapper">
                <div class="grid-system grid grid-cols-2 gap-2">
                    <a href="#" target="_blank" rel="noopener noreferrer" class="pb-2 bg-black/24 h-21.5 md:h-26 col-span-2 md:col-span-8 lg:col-span-6 w-full rounded-md">
                        
                        <img class="mx-auto mt-5.5 md:mt-6.5 h-7.5 md:h-9 mb-3 md:mb-5"
                            src="/static/images/sponsors/Sockcanoil.svg">
                        <p class="text-xs text-center mb-4">Presenting Partner</p>

                    </a>

                    <a href="#" target="_blank" rel="noopener noreferrer" class="pb-2 bg-black/24 col-span-1 md:col-span-4 lg:col-span-3 w-full h-full rounded-md">
                        
                        <img class="mx-auto mt-2 md:mt-8 mb-1 md:mb-5 h-4 md:h-7"
                            src="/static/images/sponsors/unidealista.svg">
                        <p class="text-xs text-center ">Official Partner</p>

                    </a>

                    <a href="#" target="_blank" rel="noopener noreferrer" class="pb-2 bg-black/24 col-span-1 md:col-span-4 lg:col-span-3 w-full h-full rounded-md">
                        
                        <img class="m-auto mt-2 md:mt-8 mb-1 md:mb-5 h-4 md:h-7"
                            src="/static/images/sponsors/difficultJet.svg">
                        <p class="text-xs text-center ">Official Airline</p>
                    </a>

                </div>
            </div>
        </div>

        <div class="wrapper">
            <div class="text-white flex flex-col md:flex-row text-center md:text-left my-9 md:my-10  md:justify-between md:items-center md:gap-4 text-sm">
                
                <div class="flex-1 flex justify-center md:justify-start">
                    <svg class="" width="200" aria-hidden="true">
                        <use href="#svg-logo"></use>
                    </svg>
                </div>
                
                <p class="flex-2 md:mb-0 text-sm">
                    The Pinke Socke Song Contest is coordinated by the Pinke Socke Broadcasting Union, the world's leading
                    alliance of sock-puppet media with 420 Members across 69 countries - along with 13 Associates in
                    Asia, Australasia, Africa and the Americas.
                </p>
                
                <nav class="flex-1 self-center mt-2.5 md:mt-0 md:text-right text-sm">

                    <a href="/legal/terms-and-conditions" class="inline-link-white">Terms of use</a>
                    <br>
                    <a href="/legal/privacy-policy" class="inline-link-white">Privacy & Cookie Policy</a>

                    <p>Copyright &copy; 2026</p>

                </nav>

            </div>
        </div>

    </footer>
        `;
    }
  }
  
  customElements.define('footer-bottom', Footer);

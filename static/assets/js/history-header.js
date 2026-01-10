class HistoryHeader extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <!-- Mobile Navigation Menu Overlay -->
        <div id="mobile-menu-overlay" role="dialog" aria-modal="true" aria-labelledby="mobile-nav-heading" aria-hidden="true" inert>
            
            <div class="flex justify-between items-center w-full">
                <img src="/static/images/3DSock.png" alt="Eurovision heart logo" class="h-6 w-auto" />
                <button type="button" class="mobile-menu-close" aria-label="Close mobile menu" data-close-mobile-menu
                    data-nav-item>
                    <span aria-hidden="true"><svg class="" width="24" height="24" aria-label="Close mobile menu">
                            <use href="#svg-close"></use>
                        </svg></span>
                    <span class="sr-only">Close mobile menu</span>
                </button>
            </div>

            <nav class="flex flex-col flex-1 self-stretch" role="navigation" aria-labelledby="mobile-nav-heading">
                <h2 id="mobile-nav-heading" class="sr-only">Mobile Navigation Menu</h2>
                <div class="w-full">
                    <a href="/pssc/hohenried-2026/" class="hover:text-accent" tabindex="0" data-nav-item>
                        Pinke Socke Song Contest
                    </a>

                </div>
            </nav>

        </div>

        <header id="main-header" data-role="main-header">
            <div class="py-2.5 px-3 lg:py-2 lg:px-4 bg-black/40 rounded-4xl backdrop-blur-lg">
                
                <!-- Mobile Header -->
                <div class="lg:hidden">
                    <div class="flex justify-between items-center">
                        <!-- Left: Burger Menu -->
                        <button type="button" class="mobile-menu-open" aria-label="Open mobile menu"
                            data-open-mobile-menu><svg class="" width="24" height="24" aria-label="Open mobile menu">
                                <use href="#svg-menu-burger"></use>
                            </svg></button>
                        <!-- Center: Logo -->

                        <a href="/" aria-label="Eurovision Song Contest Logo"
                            class="flex flex-1 justify-center items-center"><svg class="" width="6.8125rem"
                                height="2.25rem" aria-hidden="true">
                                <use href="#svg-logo"></use>
                            </svg></a>
                    </div>
                </div>
                
                <!-- Desktop Version -->
                <div class="hidden lg:block">
                    <div class="flex">
                        
                        <nav class="flex flex-1 gap-4 relative items-center" role="navigation" aria-label="Main navigation">
                            <a href="/">
                                <img src="/static/images/3DSock.png" width="30px"/>
                            </a>
                            <a href="/pssc/hohenried-2026/" class="btn hover:text-accent" tabindex="0" data-nav-item>
                                Pinke Socke Song Contest
                            </a>
                        </nav>

                        <a href="/" aria-label="Eurovision Song Contest Logo" class="flex flex-1 justify-center items-center">
                            <svg class="" width="6.8125rem" height="2.25rem" aria-hidden="true">
                                <use href="#svg-logo"></use>
                            </svg>
                        </a>

                        <nav class="flex flex-1 gap-4 items-center justify-end" role="navigation" aria-label="User account navigation">
                            <p><b>Grand Finale:</b> 16th May 2026</p>
                        </nav>

                    </div>

                </div>
            </div>
        </header>
        `;
    }
  }
  
  customElements.define('history-header', HistoryHeader);

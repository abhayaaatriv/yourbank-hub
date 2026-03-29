export const agentTools = {
  // Get current page state and elements
  getPageState: () => {
    const elements = document.querySelectorAll('button, input, a, [role="button"]');
    const elementList = Array.from(elements)
      .filter(el => el.offsetParent !== null) // visible elements only
      .map((el, idx) => ({
        id: idx,
        type: (el as HTMLElement).tagName.toLowerCase(),
        text: (el as HTMLElement).innerText?.substring(0, 50) || el.getAttribute('aria-label') || 'button',
        label: el.getAttribute('aria-label') || el.getAttribute('name') || '',
      }))
      .slice(0, 20); // Limit to 20 elements

    return {
      url: window.location.pathname,
      title: document.title,
      elements: elementList,
    };
  },

  // Click an element by index
  clickElement: (elementIndex: number) => {
    const elements = document.querySelectorAll('button, input, a, [role="button"]');
    const element = elements[elementIndex] as HTMLElement;
    if (element) {
      element.click();
      return { success: true, message: `Clicked on element: ${element.innerText || element.getAttribute('aria-label')}` };
    }
    return { success: false, message: 'Element not found' };
  },

  // Type text into an input field
  typeText: (elementIndex: number, text: string) => {
    const elements = document.querySelectorAll('input, textarea');
    const element = elements[elementIndex] as HTMLInputElement;
    if (element) {
      element.focus();
      element.value = text;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      return { success: true, message: `Typed "${text}" into field` };
    }
    return { success: false, message: 'Input field not found' };
  },

  // Read page content
  readPage: () => {
    const main = document.querySelector('main') || document.body;
    const text = main.innerText.substring(0, 500);
    return { content: text };
  },

  // Navigate to a page
  navigateTo: (path: string) => {
    window.location.pathname = path;
    return { success: true, message: `Navigating to ${path}` };
  },

  // Wait for an element to appear
  waitForElement: async (selector: string, timeout: number = 5000) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (document.querySelector(selector)) {
        return { success: true, message: 'Element found' };
      }
      await new Promise(r => setTimeout(r, 100));
    }
    return { success: false, message: 'Element timeout' };
  },

  // Scroll the page
  scrollPage: (direction: 'up' | 'down') => {
    window.scrollBy(0, direction === 'down' ? 300 : -300);
    return { success: true, message: `Scrolled ${direction}` };
  },
};

export type AgentToolName = keyof typeof agentTools;
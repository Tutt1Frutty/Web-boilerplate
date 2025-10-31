import {initTeachinderUI} from "./index";

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    const includes = document.querySelectorAll<HTMLElement>('[data-include]');

    for (const el of includes) {
        const file = el.getAttribute('data-include');
        if (!file) continue;

        try {
            const response = await fetch(file);
            if (response.ok) {
                el.innerHTML = await response.text();
            } else {
                el.innerHTML = `<p style="color:red;">Couldn't load ${file}</p>`;
            }
        } catch (error) {
            el.innerHTML = `<p style="color:red;">Error loading ${file}: ${(error as Error).message}</p>`;
        }
    }
    document.dispatchEvent(new Event('componentsLoaded'));
    initTeachinderUI();
});
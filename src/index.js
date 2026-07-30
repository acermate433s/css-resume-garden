await import('./styles/reset.css');

const queryStyle = new URLSearchParams(window.location.search).get('style');
console.log(`Query style: ${queryStyle}`);
if (queryStyle == null) {
    await import('./styles/style.css');
} else {
    try {
        await import(`./styles/${queryStyle}.css`);
    } catch {
        await import('./styles/style.css');
    }    
}
const api = {
    getHeroes: () => fetch("/.netlify/functions/heroes")
        .then(resp => resp.json()),
    getGuide: hero => fetch(`/.netlify/functions/guides?hero=${hero}`)
        .then(resp => resp.json())
};

export default api;

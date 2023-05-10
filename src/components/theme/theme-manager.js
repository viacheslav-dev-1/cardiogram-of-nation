/**
 * Chooses the Theme by Name and applies it to the application
 * @param { String } name Theme Name
 */
export const applyTheme = (name) => {
    const root = document.querySelector(':root')

    if (!name) {
        console.warn('Theme name was not provided.')
        return
    }

    const theme = themes[name]
    if (!theme) {
        console.warn('Theme with specified name was not found! If you want to create new Theme, you should use \'addCustomTheme\' function.')
        return
    }

    Object.entries(theme).forEach(it => {
        root.style.setProperty(it[0], it[1]);
    })
}

/**
 * Inits theme manager with custom Themes
 * @param { Object} themeObject Theme Object
 */
export const initThemes = (themeObject) => {
    if (themeObject === null || themeObject === undefined) {
        console.warn('Theme object cannot be empty.')
        return
    }

    themes = themeObject

    themeObject.default && applyTheme(themeObject.default)
}

/**
 * Returns the Theme by it's Name
 * @param { String } name Theme Name
 * @returns { Object } Theme Object
 */
export const getTheme = (name) => {
    if (isBlank(name)) {
        console.warn('Theme name was not provied.')
        return null
    }

    return themes[name];
}

/**
 * Gets CSS Variable Value
 * @param { String } name CSS Variable Name
 * @returns { String } CSS Variable Value
 */
export const getThemeVariable = (name) => {
    if (isBlank(name)) {
        console.warn('Variable name was not provied.')
        return null
    }

    const styles = getComputedStyle(document.querySelector(':root'));
    return styles.getPropertyValue(name);
}


// Privates
const isBlank = str => !str || /^\s*$/.test(str)

let themes = {}

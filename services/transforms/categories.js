const transformCategories = (categories) => {
    return categories.length > 0 ?
        categories.find((categoria) => categoria.id === 'category').values[0].path_from_root.map((textCategory) => textCategory.name) :
        null;
}

module.exports = { transformCategories };
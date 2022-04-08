async function validateBlog(req, res, next){
    let { title, description, markup } = req.body

    title = title.trim()
    description = description.trim()
    markup = markup.trim()

    if(typeof title !== 'string' || typeof description !== 'string' || typeof markup !== 'string'){
        return res.status(400).json({error: true, message: 'Type did not match'})
    }

    if(title.length < 5 || title.length > 100){
        return res.status(400).json({error: true, type: 'title', message: 'number of characters in title should be between 5 and 50'})
    }

    if(description.length < 20 || description.length > 450 ){
        return res.status(400).json({error: true, type: 'description', message: 'number of characters in description should be between 5 and 450'})
    }

    const markupWordsCount = markup.split(' ').length

    if(markupWordsCount < 500){
        return res.status(400).json({error: true, type: 'markup', message: `More than 500 words necessary for blog. Your words count is ${markupWordsCount}`})
    }

    if(req.file === undefined){
        req.file = Object()
        req.file.filename = 'default'
    }

    req.body = {
        title, description, markup
    }

    next()


}

module.exports = validateBlog
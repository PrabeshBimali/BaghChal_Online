async function validateForum(req, res, next){
    let { title, markup } = req.body

    title = title.trim()
    markup = markup.trim()

    if(typeof title !== 'string' || typeof markup !== 'string'){
        return res.status(400).json({error: true, message: 'Type did not match'})
    }

    if(title.length < 5 || title.length > 90){
        return res.status(400).json({error: true, type: 'title', message: 'number of characters in title should be between 5 and 90'})
    }

    const markupWordsCount = markup.split(' ').length

    if(markupWordsCount < 3){
        return res.status(400).json({error: true, type: 'markup', message: `More than 3 words necessary for forum. Your words count is ${markupWordsCount}`})
    }

    req.body = {
        title, markup
    }

    next()


}

module.exports = validateForum
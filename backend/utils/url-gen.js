
const { getPics } = require("../awsS3");
const genPicUrl = async (prefix) =>{
    console.log('getting purls')
    let root = `https://elixrawsbucket.s3.amazonaws.com/`
    let data = await getPics(prefix)
    console.log('got data')
    let urlArr = []
    for(let i = 1; i < data.length; i++){
        let url = root + data[i].Key
        urlArr.push(url)
    }
    console.log(urlArr)
    return urlArr
}


module.exports = {genPicUrl}

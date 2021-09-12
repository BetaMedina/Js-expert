const {readFile} = require("fs/promises")
const User = require("./user.model")
const {constants} = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 4,
    fields: ["id","name","profession","age"]
}

class File{
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath)
        const validate = await File.isValid(content)
        if(!validate.valid) throw new Error(validate.error)
        const user = File.parseCsvToJson(content)
        
        return user
    }

    static async getFileContent(filePath){
        return  (await readFile(filePath)).toString("utf-8") 
    }

    static isValid(csvString,options=DEFAULT_OPTIONS){
        const [header,...fileWithoutHeaders] = csvString.split("\n")
        const isHeaderValid = header === options.fields.join(",")
        
        if(!isHeaderValid){
            return {
                error:constants.error.FILE_FIELDS_ERROR_MESSAGE,
                valid:false
            }
        }

        const isContentLengthAccepted = (
            fileWithoutHeaders.length > 1 && 
            fileWithoutHeaders.length <= options.maxLines
        )
        if(!isContentLengthAccepted){
            return {
                error:constants.error.FILE_LENGTH_ERROR_MESSAGE,
                valid:false
            }
        }
        return {valid:true}
    }

    static parseCsvToJson(csvString){
        const lines = csvString.trim().split('\n')
        const firstLine = lines.shift()
        const header = firstLine.split(',')
        const users = lines.map(res=>{
            let user = {}
            const columns = res.split(',')
            for(const index in columns){
                user[header[index]] = columns[index]
            }
            return new User(user)
        })
        return users
    }
}

exports.File = File
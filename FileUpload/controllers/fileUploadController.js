const File = require('../models/File');
const fs = require('fs');
const path = require('path');

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files?.imageFile;
        
        const {name, email} = req.body;
        if(!file || !name?.trim() || !email?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'All Fields Are Required!',
            });
        }
        const extension = file.name.split('.');
        const supportedTypes = ["jpeg", "jpg", "png"];

        if(!isSupportedType(supportedTypes, extension));


        const uploadPath = path.join(__dirname, "uploads");

        if(!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        
        // const filePath = path.join(uploadPath, file.name);
        const filePath = path.join(uploadPath, Date.now()+'.'+extension[extension.length-1]);
        
        await file.mv(filePath, (err) => {
            if(err) {
                console.log('Error: ', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error while uploading file locally!'
                })
            }
        });

        return res.status(200).json({
            success: true,
            message: 'File Uploaded Locally Successfully!',
        });
    }catch(err) {
        console.error('Error in localFileUpload: ', err);
        
        return res.status(500).json({
            success: false,
            message: 'Error Uploading File',
        });
    }
}

const isSupportedType = (supportedTypes, fileType) => {
    return supportedTypes.includes(fileType);
}

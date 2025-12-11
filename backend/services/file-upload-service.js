const multer = require('multer');

const storageEngine = multer.diskStorage({
    destination:(req,file,cb) =>
    {
        console.log('Multer Storage Engine - Processing:', file.fieldname);
        if(file.fieldname==='profile')
        {
            console.log('Saving profile image to ./storage/images/profile/');
            cb(null,'./storage/images/profile/')
        }
        else if(file.fieldname==='image')
        {
            console.log('Saving team image to ./storage/images/teams/');
            cb(null,'./storage/images/teams/')
        }
        else
        {
            console.log('Unknown fieldname, rejecting upload');
            cb(null,false);
        }
    },
    filename:(req,file,cb)=>
    {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.fieldname + "-" + uniqueSuffix + file.originalname;
        console.log('Generated filename:', filename);
        cb(null, filename);
    }
})


const fileFilter = (req,file,cb) =>{
    console.log('File Filter Method Called');
    console.log('File fieldname:', file.fieldname);
    console.log('File mimetype:', file.mimetype);
    
    if(file === 'undefined')
    {
        console.log('File is undefined');
        cb(null,false);
    }
    // Check for profile image (user profile pictures)
    else if(file.fieldname==='profile')
    {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        {
            console.log('Profile image accepted:', file.originalname);
            cb(null,true);
        }
        else
        {
            console.log('Profile image rejected - invalid mimetype:', file.mimetype);
            cb(null,false);
        }
    }
    // Check for team image
    else if(file.fieldname==='image')
    {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg')
        {
            console.log('Team image accepted:', file.originalname);
            cb(null,true)
        }
        else
        {
            console.log('Team image rejected - invalid mimetype:', file.mimetype);
            cb(null,false)
        }
    }
    else if(file.fieldname==='video')
    {
        if(file.mimetype==='video/mp4')
        {
            console.log('Video accepted:', file.originalname);
            cb(null,true)
        }
        else
        {
            console.log('Video rejected - invalid mimetype:', file.mimetype);
            cb(null,false)
        }
    }
    else
    {
        console.log('Unknown fieldname:', file.fieldname);
        cb(null,false);
    }
}


const upload = multer({
    storage: storageEngine,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

console.log('Multer configured successfully');

module.exports = upload;
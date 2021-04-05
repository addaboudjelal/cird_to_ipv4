const Cird = (ip,mask) => {
    let reg = new RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$');
    console.log(reg.test(ip));
    let result = {};
    if (reg.test(ip)){
        let [w,x,y,z] = ip.split(".");
        let num = 2 ** (32 - Number(mask));

        // loop:
        for( let i = num; i > 0; i--){
            if( w > 255){
                console.log("Invalid address");
                return null;
            }
            // console.log(w,x,y,z);

            result[num - i + 1] = {
                id: (num - i + 1).toString(),
                ip: [w,x,y,z].join("."),
                status: "available"
            };
            z++;
            if( z > 255 ){
                y++;
                z = 0;
            }
            if( y > 255 ){
                x++;
                y = 0;
            }
            if( x > 255){
                w++;
                x = 0;
            }
        }

        return result;
    }else {
        return null;
    }
    
}

export default Cird;
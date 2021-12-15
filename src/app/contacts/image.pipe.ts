import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'imageFolder'
})
export class ImagePipe implements PipeTransform{
    transform(value: any) {
        if(!value)
            value = "../assets/folder.png"
        return value;
        //throw new Error("Method not implemented.");
    }

}
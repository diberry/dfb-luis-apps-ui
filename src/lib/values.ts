export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
  }

  export class Values {

    static findKeyValue = ((arr: IValues[], propertyName:string): any =>{

        if (!arr || arr.length===0 || !propertyName || propertyName.length) return;
        const arrItem:any = arr.find(x => x.hasOwnProperty(propertyName));
        if (!arrItem) return "";
        if (arrItem && arrItem[propertyName]) return arrItem[propertyName];
    })
}
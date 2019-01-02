const NOT_DEFINED = "";

export function getAttributeByAttributeKey(mbean:any, searchAttrKey: string) {
  const attributes:Array<any> = getAttributesOfMBean(mbean);
  const matchedAttribute = attributes.find((attribute:any) => {
    return getAttributesIdOfAttribute(attribute).indexOf(searchAttrKey) > -1;
  });

  return matchedAttribute;
}

export function getMBeanAttributeValueByAttributeKey(mbean:any, searchAttrKey: string) {
  const matchedAttribute = getAttributeByAttributeKey(mbean, searchAttrKey);

  if(!matchedAttribute) {
    return NOT_DEFINED;
  }

  return getAttributesValueOfAttribute(matchedAttribute);
}

export function getInventoryMBeansByMBeanKey(inventory:any, searchMBeanKey: string, fineSearch?: string) {
  const mbeans:Array<any> = inventory.system.mbean;
  const matchedMBean = mbeans.filter((mbean:any) => {
    const filter1Match = mbean.attr["@_cimclass"].indexOf("_" + searchMBeanKey) > -1;
    if(filter1Match && fineSearch) {
      if(fineSearch.charAt(0) === "!") {
        return mbean.attr["@_id"].indexOf(fineSearch.substring(1)) === -1;
      }
      else {
        return mbean.attr["@_id"].indexOf(fineSearch) > -1;
      }
    }
    else {
      return filter1Match;
    }
  });

  return matchedMBean;
}

export function getAttributesOfMBean(mbean:any) {
  return mbean.attribute;
}

export function getAttributesIdOfAttribute(attribute:any) {
  return attribute.attr["@_id"];
}

export function getAttributesValueOfAttribute(attribute:any) {
  return attribute.attr["@_value"];
}

export function OR(a:string, b:string) {
  if(!a || a === NOT_DEFINED) {
    return b;
  }
  return a;
}

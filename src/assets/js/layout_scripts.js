
/***** script myid =  *****/
 $(function(){try{$('a').each(function(){var hrefAttr=$(this).attr('href');if(hrefAttr && hrefAttr.charAt(0) != '#' && !(hrefAttr.startsWith('http:/') || hrefAttr.startsWith('https:/'))){$(this).removeAttr('href');$(this).attr('href','#');} })}catch(e){console.error('Exception while replacing anchor href attribute with # in Layout ',e);}});

/***** script myid =  *****/
 try{function mask() { var currObj = document.getElementById('mask'); currObj.style.display='block'; currObj.style.zIndex = '11111111111111';}function unmask() { var currObj = document.getElementById('mask'); currObj.style.display='none'; currObj.style.zIndex = '50';}}catch(e){}

/***** script myid =  *****/
 try{setPageStorageData('body');}catch(e){console.error('Exception while calling setPageStorageData in layout ',e);}

/***** script myid =  *****/
 try{if(true){gateWay('','','','parentArea',false,false,false,'page','DefaultPage')};}catch(e){}

function separateURL(URL){
	if (URL.split('/').length == 1){
		return URL;
	} else {
		return URL.replace(/\//g,' \/ ');
	}
}
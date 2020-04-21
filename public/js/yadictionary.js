function trArr (def) {
 fristTransl = def.find(tr => tr.tr).tr
  return [def[0].text,fristTransl[0].text]
}
function getTranslate (lang,toLang, word) {
		axios.get('/yaDict', {
			params: {
			  lang:  `${lang}-${toLang}`,
			  text: word,
			  key: 'dict.1.1.20181112T233755Z.9006a0f8c80c7ba4.bd35d8afd25ed988086a8c88b9f9888392cfe9fe'
			}
		  })
		  .then(function (response) {
			console.log(
			trArr(response.data.def)
		    );
		  })
		  .catch(function (error) {
			console.log(error);
		  })
		  .then(function () {
			// always executed
		  });
}

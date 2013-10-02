//js cookbook/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('components/core/admin/core/scripts/build.html', {
		markdown : ['core']
	});
});

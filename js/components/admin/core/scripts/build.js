//steal/js cookbook/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build',
	  'steal/build/scripts',
	  'steal/build/styles',
	  'steal/build/apps').then(

	function(){

                steal.build('components/core/admin/core/scripts/build.html', {to: 'components/core/admin/core/production', compressor: 'uglify'});
		steal.build('components/core/admin/bootstrap/scripts/build.html', {to: 'components/core/admin/bootstrap/production', compressor: 'uglify'});
                steal.build('components/admin/companies/scripts/build.html', {to: 'components/admin/companies/production', compressor: 'uglify'});

});

$('.pass').click(function(){
		var id = $(this).data('id');
		var name = $(this).data('name');
		var type = $(this).data('type');
		var desc = $(this).data('desc');

		$.post('/pass',{
			id: id,
			name: name,
			type: type,
			desc: desc
		},function(){
			alert('succese');
		});
	})
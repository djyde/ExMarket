$(function(){
	$('.imgdesc').popover({
		placement: 'top'
	});

	$('.tip').tooltip({
		placement: 'top'
	});

	$('.plusone').click(function(){
		var id = $(this).data('id');
		$(this).addClass('btn-success');
		$(this).attr('data-original-title','您已经赞过此插件');
		$.post("/like",{
			id: id
		},function(){
				alert('succese');
			});
	  $(this).attr('disabled','true');
	});

	$('.download').click(function(){
		var id = $(this).data('id');
	});

	
	
});
jQuery(document).ready(function($) {
	// Generate a simple captcha
function randomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
};
function generateCaptcha() {
$('#hoo-contactForm #captchaOperation').html([randomNumber(1, 50), '+', randomNumber(1, 50), '='].join(' '));
};
generateCaptcha();

    var frm = $('#hoo-contactForm');
    frm.bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
        fields: {
            Name: {
                validators: {
                    notEmpty: {
                        message: hcf_params.labels.hcf_input_name+hcf_params.labels.required
                    }
                }
            },
            Email: {
                validators: {
                    notEmpty: {
                        message: hcf_params.labels.hcf_input_email+hcf_params.labels.required
                    },
                    emailAddress: {
                        message: hcf_params.labels.hcf_input_email+hcf_params.labels.not_valid
                    }
                }
            },
			Subject: {
                validators: {
                    notEmpty: {
                        message: hcf_params.labels.hcf_input_subject+hcf_params.labels.required
                    }
                }
            },
            Message: {
                validators: {
                    notEmpty: {
                        message: hcf_params.labels.hcf_input_message+hcf_params.labels.required
                    }
                }
            },
			captcha: {
				validators: {
				callback: {
					message: hcf_params.labels.captcha_error,
					callback: function(value, validator) {
						var items = $('#hoo-contactForm #captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
						return value == sum;
								}
						}
					}
				}
        }
    })
    .on('success.form.bv', function(e) {
            e.preventDefault();
            
			$('#hoo-contactForm #status').show();
            $('#hoo-contactForm #status').html(hcf_params.waiting);
			var $form = $(e.target);
         // Get the BootstrapValidator instance
         var bv = $form.data('bootstrapValidator');
        	 $.post(hcf_params.ajaxurl, $form.serialize(), function(result) {
				$('#hoo-contactForm #status').html(result.msg);
				document.getElementById("hoo-contactForm").reset();

			},'json');
		 
        });
	
	
	
		
		
});

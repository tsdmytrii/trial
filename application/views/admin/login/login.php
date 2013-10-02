<div class="hero-unit">
	<form class="well" action="<?= base_url() ?>admin/login/process" method="post">
		<fieldset>
			<legend>Login to Autocentr admin</legend>
			<label>Enter login</label>
			<input name="login" type="text" placeholder="Login" class="span3">
			<label>Enter password</label>
			<input name="password" type="password" placeholder="Password" class="span3">
			<div class="form-actions">
				<button class="btn btn-primary pull-right" type="submit">Login</button>
			</div>
			<?print_r($this->ion_auth->errors())?>
			<?print_r($this->ion_auth->messages())?>
		</fieldset>
	</form>
</div>
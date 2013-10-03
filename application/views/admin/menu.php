<div class="navbar" style="margin-bottom: 25px;">
	<div class="navbar-inner">
		<div class="container">
			<a data-target=".nav-collapse" data-toggle="collapse" class="btn btn-navbar">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
                        <a href="#" class="brand" style="color: #fff;">CMS 2.0 admin</a>
			<div class="nav-collapse" id="nav">
				<ul class="nav">

					<?php foreach ($menu as $key => $value): ?>
                                                <?php if($value['parent_id'] == 0):?>

                                                    <li>

                                                        <?php if($value['url'] == ''):?>
                                                            <div class="menuItem"><?= $value['lang']['name']; ?></div>
                                                        <?php else:?>
                                                            <a class="new_component" href="<?= base_url() ?><?= $value['url'] ?>" title="<?= $value['lang']['name'];?>"><?= $value['lang']['name']; ?></a>
                                                        <?php endif;?>

                                                        <div class="subMenu">

                                                            <?php foreach ($menu as $k => $val): ?>

                                                                <?php if ($val['parent_id'] == $value['id']):?>
                                                                        <?php if($val['url'] == ''):?>
                                                                            <div class="subMenuItem"><?= $val['lang']['name']; ?></div>
                                                                        <?php else:?>
                                                                            <a class="new_component subMenuItem" href="<?= base_url() ?><?= $val['url'] ?>" title="<?= $val['lang']['name'];?>"><?= $val['lang']['name']; ?></a>
                                                                        <?php endif;?>
                                                                <?php endif;?>

                                                            <?php endforeach;?>

                                                        </div>

                                                    </li>

                                                <?php endif;?>
					<?php endforeach; ?>

				</ul>
				<ul class="nav pull-right">
					<li><a target="_blank" href="<?= base_url() ?>">На главную</a></li>
					<li class="divider-vertical"></li>
					<li class="dropdown">
                                                <div class="menuItem">Вы зашли как <?= $user['first_name'] ?> <?= $user['last_name'] ?> <b class="caret"></b></div>
						<ul class="dropdown-menu">
							<li><a href="<?= base_url() ?>admin/login/logout">Выйти</a></li>
						</ul>
					</li>
				</ul>
			</div><!-- /.nav-collapse -->
		</div>
	</div><!-- /navbar-inner -->
</div>
import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: [ 'home.page.scss' ]
})
export class HomePage {
	constructor(private fb: Facebook) {
		fb
			.getLoginStatus()
			.then((res) => {
				console.log(res.status);
				if (res.status === 'connect') {
					this.isLoggedIn = true;
				} else {
					this.isLoggedIn = false;
				}
			})
			.catch((e) => console.log(e));
	}
	isLoggedIn: boolean = false;
	users: any;
	hashtag: string;
	hashtags_list: any;
	login() {
		this.fb
			.login([ 'public_profile', 'user_friends', 'email' ])
			.then((res) => {
				if (res.status === 'connected') {
					this.isLoggedIn = true;
					this.getUserDetail(res.authResponse.userID);
					alert('Successful login'); //when is success
				} else {
					this.isLoggedIn = false;
					alert('anything is wrong');
				}
			})
			.catch((e) => {
				console.log('Error logging into Facebook', e);
				alert('anything is wrong');
			});
	}
	logout() {
		this.fb
			.logout()
			.then((res) => (this.isLoggedIn = false))
			.catch((e) => console.log('Error logout from Facebook', e));
	}
	getUserDetail(userid) {
		this.fb
			.api('/' + userid + '/?fields=id,email,name,picture,gender', [ 'public_profile' ]) // see
			.then((res) => {
				this.users = res;
			})
			.catch((e) => {
				console.log(e);
			});
	}

	mySearch() {
		let userid = this.users.id;
		this.fb
			.api('/search?user_id=' + userid + '&q=%23' + this.hashtag, [ 'public_profile' ])
			// {user-id}&q={hashtag}
			.then((res) => {
				this.hashtags_list = res;
			})
			.catch((e) => {
				console.log(e);
			});
	}
}

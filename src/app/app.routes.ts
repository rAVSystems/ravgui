import { Routes } from '@angular/router';
import { Shell } from './components/shell/shell';
import { Home } from './pages/home/home';
import { Settings } from './pages/settings/settings';
import { Audio } from './pages/audio/audio';
import { Camera } from './pages/camera/camera';

export const routes: Routes = [
    {
        path: '',
        component: Shell,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: Home },
        ]
    },
    { path: 'settings', component: Settings },
    { path: 'audio', component: Audio },
    { path: 'camera', component: Camera },
];

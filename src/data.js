import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Web from 'material-ui/svg-icons/av/web';
import {cyan600, pink600, purple600} from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const data = {
  menus: [
    {
      text: 'Start Scan',
      icon: <Assessment/>,
      link: '/dashboard'
    }, {
      text: 'Manage classes',
      icon: <Web/>,
      link: '/form'
    }, {
      text: 'Reports',
      icon: <GridOn/>,
      link: '/table'
    }, {
      text: 'Login Page',
      icon: <PermIdentity/>,
      link: '/login'
    }
  ],
  tablePage: {
    items: [
      {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }, {
        id: 1,
        name: '6.002',
        term: 'spring',
        year: '2017'
      }

    ]
  },
  dashBoardPage: {
    recentProducts: [
      {
        id: 1,
        title: 'input Name 1',
        text: 'add name of student'
      }, {
        id: 2,
        title: 'input Name 2',
        text: 'add name of student'
      }, {
        id: 3,
        title: 'input Name 3',
        text: 'add name of student '
      }, {
        id: 4,
        title: 'input Name 4',
        text: 'add name of student'
      }
    ],
    Users: [
      {
        id: 1,
        title: 'Benjamin Segal',
        text: 'Time : 9:04'
      }, {
        id: 2,
        title: 'David',
        text: 'Time : 9:05'
      }, {
        id: 3,
        title: 'Jermy',
        text: 'Time : 9:06 '
      }, {
        id: 4,
        title: 'Alex ',
        text: 'Time : 9:06'
      }
    ],
    monthlySales: [
      {
        name: 'Jan',
        uv: 3700
      }, {
        name: 'Feb',
        uv: 3000
      }, {
        name: 'Mar',
        uv: 2000
      }, {
        name: 'Apr',
        uv: 2780
      }, {
        name: 'May',
        uv: 2000
      }, {
        name: 'Jun',
        uv: 1800
      }, {
        name: 'Jul',
        uv: 2600
      }, {
        name: 'Aug',
        uv: 2900
      }, {
        name: 'Sep',
        uv: 3500
      }, {
        name: 'Oct',
        uv: 3000
      }, {
        name: 'Nov',
        uv: 2400
      }, {
        name: 'Dec',
        uv: 2780
      }
    ],
    newOrders: [
      {
        pv: 2400
      }, {
        pv: 1398
      }, {
        pv: 9800
      }, {
        pv: 3908
      }, {
        pv: 4800
      }, {
        pv: 3490
      }, {
        pv: 4300
      }
    ],
    browserUsage: [
      {
        name: 'Chrome',
        value: 800,
        color: cyan600,
        icon: <ExpandMore/>
      }, {
        name: 'Firefox',
        value: 300,
        color: pink600,
        icon: <ChevronRight/>
      }, {
        name: 'Safari',
        value: 300,
        color: purple600,
        icon: <ExpandLess/>
      }
    ]
  }
};

export default data;

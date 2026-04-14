import { List, ListItemButton, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { getStyles } from './styles';
import { theme } from '../../theme';

export function TopMenu() {
  const styles = getStyles(theme);

  const menu = [
    {
      id: 'about',
      title: 'Про Hyundai',
      children: [
        {
          id: 'brand',
          title: 'Про Бренд',
          children: [
            { id: 'history', title: 'Історія', link: 'https://hyundai-zp.com.ua/istoriya-kompanii-hyundai' },
            {
              id: 'mission',
              title: 'Місія та цінності',
              link: 'https://hyundai-zp.com.ua/misiya-ta-cinnosti-kompanii-hyundai',
            },
            {
              id: 'philosophy',
              title: 'Філософія бренду',
              link: 'https://hyundai-zp.com.ua/regular-and-special-information',
            },
            {
              id: 'ukraine',
              title: 'Hyundai в Україні',
              children: [
                {
                  id: 'ua-about',
                  title: 'Про "Хюндай Мотор Україна"',
                  link: 'https://hyundai-zp.com.ua/hyundai-in-ukraine',
                },
                {
                  id: 'ua-info',
                  title: 'Регулярна та особлива інформація',
                  link: 'https://hyundai-zp.com.ua/regular-and-special-information',
                },
              ],
            },
            { id: 'world', title: 'Hyundai у світі', link: 'https://www.hyundai.com/worldwide/en' },
          ],
        },
        { id: 'news', title: 'Новини', link: 'https://hyundai-zp.com.ua/news_bogdanauto-zp' },
        {
          id: 'innovation',
          title: 'Інновації',
          children: [
            { id: 'tech', title: 'Інтелектуальні технології', link: 'https://hyundai-zp.com.ua/smart-tech' },
            { id: 'eco', title: 'ЕКО', link: 'https://hyundai-zp.com.ua/eco-technology' },
            { id: 'performance', title: 'Продуктивність', link: 'https://hyundai-zp.com.ua/performance' },
            { id: 'transmission', title: 'Трансмісія', link: 'https://hyundai-zp.com.ua/powertrain' },
          ],
        },
        {
          id: 'wrc',
          title: 'WRC',
          children: [
            {
              id: 'wrc-2019',
              title: 'Переможець Чемпіонату світу з ралі-2019',
              link: 'https://hyundai-zp.com.ua/wrc-2019-winners',
            },
            { id: 'wrc-main', title: 'Hyundai у WRC', link: 'https://hyundai-zp.com.ua/wrc' },
          ],
        },
      ],
    },
  ];

  const [openItems, setOpenItems] = useState({});

  const toggle = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderMenu = (items, level = 0) => {
    return items.map((item) => {
      const hasChildren = !!item.children;
      const isOpen = openItems[item.id];

      return (
        <div key={item.id}>
          <ListItemButton
            sx={styles.topMenuItem}
            component={!hasChildren && item.link ? 'a' : 'div'}
            href={!hasChildren ? item.link : undefined}
            target={item.link && item.link.startsWith('http') ? '_blank' : '_self'}
            onClick={() => hasChildren && toggle(item.id)}
          >
            <ListItemText primary={item.title} />

            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List disablePadding>{renderMenu(item.children, level + 1)}</List>
            </Collapse>
          )}
        </div>
      );
    });
  };

  return (
    <List sx={styles.topMenuLayout}>
      {/* статичні лінки */}
      <ListItemButton
        sx={styles.topMenuItem}
        component="a"
        href="https://hyundai-zp.com.ua/contacts-bogdanauto-zp"
        target="_blank"
      >
        <ListItemText primary="Контакти" />
      </ListItemButton>

      <ListItemButton
        sx={styles.topMenuItem}
        component="a"
        href="https://hyundai-zp.com.ua/zapys-servis-bogdanauto-zp"
        target="_blank"
      >
        <ListItemText primary="Запис на сервіс" />
      </ListItemButton>

      <ListItemButton
        sx={styles.topMenuItem}
        component="a"
        href="https://hyundai-zp.com.ua/test-drive-bogdanauto-zp"
        target="_blank"
      >
        <ListItemText primary="Тест-Драйв" />
      </ListItemButton>

      <ListItemButton
        sx={styles.topMenuItem}
        component="a"
        href="https://hyundai-zp.com.ua/video-review-zp"
        target="_blank"
      >
        <ListItemText primary="Відеоогляд" />
      </ListItemButton>

      {/* меню */}
      {renderMenu(menu)}
    </List>
  );
}

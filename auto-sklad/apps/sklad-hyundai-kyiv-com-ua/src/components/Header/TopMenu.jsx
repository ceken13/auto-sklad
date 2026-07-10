import { List, ListItemButton, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { getStyles } from './styles';
import { theme } from '../../theme';

export function TopMenu() {
  const styles = getStyles(theme);

  const [open, setOpen] = useState(false);
  const [path, setPath] = useState([]);

  const menu = [
    {
      id: 'about',
      title: 'Про Hyundai',
      children: [
        {
          id: 'brand',
          title: 'Про бренд',
          children: [
            {
              id: 'history',
              title: 'Історія',
              link: 'https://hyundai-kyiv.com.ua/istoriya-kompanii-hyundai',
            },
            {
              id: 'mission',
              title: 'Місія та цінності',
              link: 'https://hyundai-kyiv.com.ua/misiya-ta-cinnosti-kompanii-hyundai',
            },
            {
              id: 'philosophy',
              title: 'Філософія бренду',
              link: 'https://hyundai-kyiv.com.ua/regular-and-special-information',
            },
            {
              id: 'ukraine',
              title: 'Hyundai в Україні',
              children: [
                {
                  id: 'ua-about',
                  title: 'Про "Хюндай Мотор Україна"',
                  link: 'https://hyundai-kyiv.com.ua/hyundai-in-ukraine',
                },
                {
                  id: 'ua-info',
                  title: 'Регулярна та особлива інформація',
                  link: 'https://hyundai-kyiv.com.ua/regular-and-special-information',
                },
              ],
            },
            {
              id: 'world',
              title: 'Hyundai у світі',
              link: 'https://www.hyundai.com/worldwide/en',
            },
          ],
        },
        {
          id: 'news',
          title: 'Новини',
          link: 'https://hyundai-kyiv.com.ua/news_bogdanauto',
        },
        {
          id: 'innovation',
          title: 'Інновації',
          children: [
            {
              id: 'tech',
              title: 'Інтелектуальні технології',
              link: 'https://hyundai-kyiv.com.ua/smart-tech',
            },
            {
              id: 'eco',
              title: 'ЕКО',
              link: 'https://hyundai-kyiv.com.ua/eco-technology',
            },
            {
              id: 'performance',
              title: 'Продуктивність',
              link: 'https://hyundai-kyiv.com.ua/performance',
            },
            {
              id: 'transmission',
              title: 'Трансмісія',
              link: 'https://hyundai-kyiv.com.ua/powertrain',
            },
          ],
        },
        {
          id: 'wrc',
          title: 'WRC',
          children: [
            {
              id: 'wrc-2019',
              title: 'Переможець Чемпіонату світу з ралі-2019',
              link: 'https://hyundai-kyiv.com.ua/wrc-2019-winners',
            },
            {
              id: 'wrc-main',
              title: 'Hyundai у WRC',
              link: 'https://hyundai-kyiv.com.ua/wrc',
            },
          ],
        },
      ],
    },
  ];

  const rootItems = menu[0].children;

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
    setPath([]);
  };

  const handleItemClick = (item, level) => {
    if (item.children) {
      const newPath = path.slice(0, level);
      newPath[level] = item;
      setPath(newPath);
    } else if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  const levels = [rootItems];
  path.forEach((p) => {
    if (p?.children) levels.push(p.children);
  });

  return (
    <List sx={styles.topMenuLayout}>
      {/* статичні */}
      <ListItemButton
        sx={styles.topMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/contacts-bogdanauto"
        target="_blank"
      >
        <ListItemText primary="Контакти" />
      </ListItemButton>

      <ListItemButton sx={styles.topMenuItem} component="a" href="https://sklad.hyundai-kyiv.com.ua/">
        <ListItemText primary="Авто в наявності" />
      </ListItemButton>

      <ListItemButton
        sx={styles.topMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/zapys-servis-bogdanauto"
        target="_blank"
      >
        <ListItemText primary="Запис на сервіс" />
      </ListItemButton>

      <ListItemButton
        sx={styles.topMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/test-drive-bogdanauto"
        target="_blank"
      >
        <ListItemText primary="Тест-Драйв" />
      </ListItemButton>

      <ListItemButton
        sx={styles.topMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/video-review-bogdan-avto"
        target="_blank"
      >
        <ListItemText primary="Відеоогляд" />
      </ListItemButton>

      {/* ПРО HYUNDAI */}
      <div style={styles.topMenuWrapper} onClick={(e) => e.stopPropagation()}>
        <ListItemButton sx={styles.topMenuItem} onClick={handleToggle}>
          <ListItemText primary="Про Hyundai" />
        </ListItemButton>

        {open && (
          <>
            <div
              style={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              ✕
            </div>
            <div
              style={{
                ...styles.dropdown,

                transition: 'transform 0.3s ease',
              }}
            >
              {levels.map((items, levelIndex) => (
                <div key={levelIndex} style={styles.dropdownColumn}>
                  {items.map((item) => {
                    const isActive = path[levelIndex]?.id === item.id;
                    const hasChildren = !!item.children;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item, levelIndex)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: isActive ? '400' : '400',
                          color: isActive ? '#00a1c7' : '#666',
                          marginBottom: '8px',
                        }}
                      >
                        <span>{item.title}</span>
                        {hasChildren && <span>›</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </List>
  );
}

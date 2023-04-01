import {
  clsx,
  Container,
  List,
  Navbar,
  Portal,
  useMantineColorScheme
} from '@mantine/core';

import { A } from '@/components/A';
import { TLink } from '@/types';

type Props = {
  opened: boolean;
  onChange?: () => void;
  links: TLink[];
};

export const BurgerMenu = ({ opened, onChange, links }: Props) => {
  const { colorScheme } = useMantineColorScheme();

  if (!opened) {
    return null;
  }

  return (
    <Portal>
      <Container
        fluid={true}
        className={clsx(
          'fixed left-0 top-0 mt-16 h-screen w-screen',
          colorScheme === 'dark' ? 'bg-[#1A1B1E]' : 'bg-white'
        )}
      >
        <Navbar className='border-0'>
          <List
            listStyleType='none'
            className='flex flex-col gap-5 p-5 text-center'
          >
            {links.map(link => (
              <List.Item key={link.title} onClick={onChange}>
                <A className='text-4xl' href={link.href}>
                  {link.title}
                </A>
              </List.Item>
            ))}
          </List>
        </Navbar>
      </Container>
    </Portal>
  );
};

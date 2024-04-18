import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `    STARWARS-MANAGMENT-API
    <pre>
                    .-.__      \ .-.  ___  __
                |_|  '--.-.-(   \/\;;\_\.-._______.-.
                (-)___     \ \ .-\ \;;\(   \       \ \
                Y    '---._\_((Q)) \;;\\ .-\     __(_)
                I           __'-' / .--.((Q))---'    \,
                I     ___.-:    \|  |   \'-'_          \
                A  .-'      \ .-.\   \   \ \ '--.__     '\
                |  |____.----((Q))\   \__|--\_      \     '
                    ( )        '-'  \_  :  \-' '--.___\
                    Y                \  \  \       \(_)
                    I                 \  \  \         \,
                    I                  \  \  \          \
                    A                   \  \  \          '\
                    |                     \  \__|           '
                                          \_:.  \
                                            \ \  \
                                              \ \  \
                                              \_\_|                    
    </pre>
    `
  }
}

export function SpiderCharacterArt() {
    return (<g>
      <defs>
        <linearGradient id="spider-suit-dark" x1="40" y1="80" x2="-50" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A2E3B"/>
          <stop offset="0.45" stopColor="#15171F"/>
          <stop offset="1" stopColor="#0A0B10"/>
        </linearGradient>
        <linearGradient id="spider-suit-red" x1="-30" y1="180" x2="36" y2="340" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43A40"/>
          <stop offset="0.5" stopColor="#E62429"/>
          <stop offset="1" stopColor="#8E141B"/>
        </linearGradient>
        <linearGradient id="spider-head-red" x1="-40" y1="350" x2="42" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0454B"/>
          <stop offset="0.5" stopColor="#D91F25"/>
          <stop offset="1" stopColor="#7E1017"/>
        </linearGradient>
        <linearGradient id="spider-lens" x1="-34" y1="388" x2="0" y2="424" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF"/>
          <stop offset="0.6" stopColor="#E8EAEF"/>
          <stop offset="1" stopColor="#9EA3B0"/>
        </linearGradient>
        <linearGradient id="spider-glove" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#1C1F28"/>
          <stop offset="1" stopColor="#0A0B10"/>
        </linearGradient>
        <clipPath id="spider-chest-clip">
          <path d="M-16 202C-40 232-46 270-34 298C-18 318 18 318 32 298C42 264 32 226 14 202Z"/>
        </clipPath>
        <clipPath id="spider-head-clip">
          <path d="M0 344C-34 344-54 368-58 402C-62 438-42 470-14 484C-4 489 6 489 16 484C44 470 60 438 56 402C52 368 32 344 0 344Z"/>
        </clipPath>
      </defs>

      <g data-spider-body>
        {/* trailing arm, drawn behind the torso */}
        <path d="M-42 312C-76 320-98 342-98 372C-98 400-108 424-116 442" stroke="url(#spider-suit-dark)" strokeWidth="27" strokeLinecap="round" fill="none"/>
        <path d="M-96 388C-100 404-106 420-114 436" stroke="#E62429" strokeWidth="16" strokeLinecap="round" opacity="0.85"/>

        {/* free leg, bent */}
        <path d="M-12 206C-42 200-70 178-78 150C-84 124-72 102-58 92" stroke="url(#spider-suit-dark)" strokeWidth="43" strokeLinecap="round" fill="none"/>
        <path d="M-58 92C-78 84-82 64-68 54C-54 46-40 60-44 78Z" fill="url(#spider-suit-red)" stroke="#0A0B10" strokeWidth="4"/>
        <ellipse cx="-79" cy="151" rx="18" ry="13" transform="rotate(28 -79 151)" fill="url(#spider-suit-red)" stroke="#0A0B10" strokeWidth="3"/>
        <path d="M-64 196C-70 172-74 154-76 134" stroke="#E62429" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>

        {/* suspended leg */}
        <path d="M2 8C16 46 22 86 18 122C14 158 22 186 36 208" stroke="url(#spider-suit-dark)" strokeWidth="44" strokeLinecap="round" fill="none"/>
        <path d="M2 4C10 30 14 52 16 72" stroke="url(#spider-suit-red)" strokeWidth="40" strokeLinecap="round" fill="none"/>
        <g stroke="#3B070B" strokeWidth="1.2" opacity="0.7">
          <path d="M-14 18C-2 10 12 14 24 26"/>
          <path d="M-10 36C0 28 12 30 22 42"/>
          <path d="M-6 54C2 46 12 48 20 58"/>
          <path d="M4 4L18 66"/>
        </g>
        <path d="M24 106C22 138 24 172 34 196" stroke="#E62429" strokeWidth="7" strokeLinecap="round" opacity="0.45"/>

        {/* hips */}
        <path d="M-36 188C-14 176 22 178 44 198C50 218 36 240 6 246C-24 250-46 230-42 208Z" fill="url(#spider-suit-dark)" stroke="#0A0B10" strokeWidth="3"/>
        <path d="M-40 202C-12 190 24 192 44 206" stroke="url(#spider-suit-red)" strokeWidth="6" strokeLinecap="round" opacity="0.9"/>
        <path d="M-30 226C-8 234 18 232 36 220" stroke="#0A0B10" strokeWidth="2" opacity="0.8"/>

        {/* torso */}
        <path d="M-30 196C-54 230-58 274-44 306C-26 332 26 334 44 306C56 270 48 224 28 196Z" fill="url(#spider-suit-dark)" stroke="#0A0B10" strokeWidth="3"/>
        <path d="M-16 202C-40 232-46 270-34 298C-18 318 18 318 32 298C42 264 32 226 14 202Z" fill="url(#spider-suit-red)"/>

        {/* chest webbing */}
        <g clipPath="url(#spider-chest-clip)" stroke="#310509" strokeWidth="1.2" opacity="0.55" fill="none">
          <path d="M0 198V322"/>
          <path d="M0 230H-46M0 230H46"/>
          <path d="M0 258H-48M0 258H48"/>
          <path d="M0 286H-44M0 286H42"/>
          <path d="M-30 206L0 232L30 206"/>
          <path d="M-38 236Q0 224 38 236"/>
          <path d="M-40 264Q0 250 40 264"/>
          <path d="M-36 292Q0 278 36 292"/>
        </g>

        {/* original geometric spider emblem */}
        <g transform="translate(0 256)" fill="#0A0B10">
          <path d="M0-21 8-6 0 24-8-6Z"/>
          <g stroke="#0A0B10" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M-7-12-24-23-33-37"/>
            <path d="M-8-3-28-6-39 4"/>
            <path d="M-7 6-25 15-34 28"/>
            <path d="M-5 15-17 31-19 42"/>
            <path d="M7-12 24-23 33-37"/>
            <path d="M8-3 28-6 39 4"/>
            <path d="M7 6 25 15 34 28"/>
            <path d="M5 15 17 31 19 42"/>
          </g>
        </g>

        {/* torso rim light */}
        <path d="M44 306C56 270 48 224 28 196" stroke="#FF8278" strokeWidth="2" opacity="0.35" fill="none"/>
        <path d="M-30 196C-54 230-58 274-44 306" stroke="#9CC2FF" strokeWidth="1.6" opacity="0.2" fill="none"/>

        {/* shoulder pads */}
        <ellipse cx="-46" cy="310" rx="24" ry="21" transform="rotate(-24 -46 310)" fill="url(#spider-suit-red)" stroke="#0A0B10" strokeWidth="3"/>
        <ellipse cx="44" cy="309" rx="24" ry="21" transform="rotate(24 44 309)" fill="url(#spider-suit-red)" stroke="#0A0B10" strokeWidth="3"/>
        <path d="M-62 300C-70 308-70 322-58 330" stroke="#FF8278" strokeWidth="1.6" opacity="0.35" fill="none"/>

        {/* front arm */}
        <path d="M44 310C72 314 92 332 96 358C100 382 94 402 86 418" stroke="url(#spider-suit-dark)" strokeWidth="28" strokeLinecap="round" fill="none"/>
        <path d="M92 372C94 386 92 400 86 412" stroke="#E62429" strokeWidth="17" strokeLinecap="round" opacity="0.85"/>
        <path d="M92 372C94 386 92 400 86 412" stroke="#37070A" strokeWidth="1.2" opacity="0.5" fill="none" strokeDasharray="3 5"/>
        <path d="M86 414C96 420 102 432 96 444C90 454 76 454 72 442C69 432 76 420 86 414Z" fill="url(#spider-glove)" stroke="#0A0B10" strokeWidth="3"/>
        <path d="M77 440L89 434M80 446L92 441" stroke="#9296A1" strokeWidth="1.4" opacity="0.35" strokeLinecap="round"/>

        {/* trailing glove */}
        <path d="M-116 442C-106 448-100 460-106 472C-112 482-126 482-132 470C-137 460-128 446-116 442Z" fill="url(#spider-glove)" stroke="#0A0B10" strokeWidth="3"/>
        <path d="M-127 468L-115 462M-124 474L-112 469" stroke="#9296A1" strokeWidth="1.4" opacity="0.35" strokeLinecap="round"/>

        {/* neck */}
        <path d="M-22 316C-16 336-10 346 0 348C10 346 16 336 22 316Z" fill="#0A0B10"/>
        <path d="M-18 322C-10 334-4 340 0 342" stroke="#E62429" strokeWidth="2" opacity="0.5" fill="none"/>

        {/* head */}
        <path d="M0 344C-34 344-54 368-58 402C-62 438-42 470-14 484C-4 489 6 489 16 484C44 470 60 438 56 402C52 368 32 344 0 344Z" fill="url(#spider-head-red)" stroke="#0A0B10" strokeWidth="3.5"/>
        <path d="M-56 396C-56 428-38 458-12 478C-34 464-48 434-46 400Z" fill="#0A0B10" opacity="0.35"/>
        <path d="M52 388C52 420 40 450 18 472C40 452 48 424 44 392Z" fill="#0A0B10" opacity="0.28"/>
        <path d="M-20 480C-6 489 10 489 24 480C14 492-8 492-20 480Z" fill="#0A0B10" opacity="0.7"/>

        {/* mask webbing */}
        <g clipPath="url(#spider-head-clip)" stroke="#310509" strokeWidth="1.1" opacity="0.5" fill="none">
          <path d="M0 348V490"/>
          <path d="M0 370L-60 388M0 370L60 388"/>
          <path d="M0 400L-62 414M0 400L62 414"/>
          <path d="M0 430L-56 444M0 430L56 444"/>
          <path d="M-50 358Q0 372 50 358"/>
          <path d="M-58 390Q0 378 58 390"/>
          <path d="M-60 420Q0 408 60 420"/>
          <path d="M-52 450Q0 438 52 450"/>
        </g>

        {/* lenses */}
        <path d="M-42 398C-36 382-12 380-6 398C-2 416-16 432-30 430C-42 426-48 410-42 398Z" fill="#0A0B10" stroke="#0A0B10" strokeWidth="7"/>
        <path d="M42 398C36 382 12 380 6 398C2 416 16 432 30 430C42 426 48 410 42 398Z" fill="#0A0B10" stroke="#0A0B10" strokeWidth="7"/>
        <path d="M-38 399C-32 388-16 386-11 400C-8 413-19 425-29 423C-38 419-42 408-38 399Z" fill="url(#spider-lens)"/>
        <path d="M38 398C32 387 16 385 11 399C8 412 19 424 29 422C38 418 42 407 38 398Z" fill="url(#spider-lens)"/>
        <path d="M-36 409C-31 417-22 421-15 418" stroke="#E62429" strokeWidth="1.4" opacity="0.7" fill="none"/>
        <path d="M36 408C31 416 22 420 15 417" stroke="#E62429" strokeWidth="1.4" opacity="0.7" fill="none"/>
        <path d="M-33 396L-24 393M33 396L24 393" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.85" strokeLinecap="round"/>

        {/* head rim lights */}
        <path d="M56 402C52 368 32 344 0 344" stroke="#FF8278" strokeWidth="2" opacity="0.38" fill="none"/>
        <path d="M-58 402C-62 438-42 470-14 484" stroke="#A8C8FF" strokeWidth="1.6" opacity="0.22" fill="none"/>

        {/* limb highlights */}
        <path d="M20 120C18 154 24 180 34 198" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.14" fill="none"/>
        <path d="M-66 170C-70 148-66 128-58 112" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.12" fill="none"/>

        {/* web wrap at the ankle */}
        <g>
          <ellipse cx="0" cy="0" rx="19" ry="8" fill="#0A0B10" stroke="#E62429" strokeWidth="1.4"/>
          <path d="M-15-7Q0-16 15-7" stroke="#E62429" strokeWidth="1.2" fill="none"/>
          <path d="M-13 6Q0 14 13 6" stroke="#E62429" strokeWidth="1.2" fill="none"/>
          <path d="M-9-14L-4 9M3-13L7 10" stroke="#F5F5F5" strokeWidth="1" opacity="0.35"/>
        </g>
      </g>
    </g>);
}

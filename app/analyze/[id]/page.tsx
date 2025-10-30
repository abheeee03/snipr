"use client"
import { Button } from '@/components/ui/button'
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs'
import { PageStateType, TranscriptResponse } from '@/lib/types'
import { transcriptToString } from '@/lib/utils'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import ReactPlayer from 'react-player'


const transcriptTestOject = {
    "lang": "en",
    "availableLangs": [
        "en"
    ],
    "content": [
        {
            "lang": "en",
            "text": "so i have been programming",
            "offset": 80,
            "duration": 3839
        },
        {
            "lang": "en",
            "text": "professionally and on the side for",
            "offset": 1599,
            "duration": 4401
        },
        {
            "lang": "en",
            "text": "getting close to two decades at this",
            "offset": 3919,
            "duration": 4801
        },
        {
            "lang": "en",
            "text": "point i've spent many years writing java",
            "offset": 6000,
            "duration": 6160
        },
        {
            "lang": "en",
            "text": "c c plus plus python rust go javascript",
            "offset": 8720,
            "duration": 5440
        },
        {
            "lang": "en",
            "text": "typescript you name it if i could go",
            "offset": 12160,
            "duration": 4720
        },
        {
            "lang": "en",
            "text": "back and correct one mentality of mine",
            "offset": 14160,
            "duration": 5920
        },
        {
            "lang": "en",
            "text": "from that entire time i know exactly",
            "offset": 16880,
            "duration": 4720
        },
        {
            "lang": "en",
            "text": "what it would be so first let me tell",
            "offset": 20080,
            "duration": 2959
        },
        {
            "lang": "en",
            "text": "you a story so that way you can kind of",
            "offset": 21600,
            "duration": 5919
        },
        {
            "lang": "en",
            "text": "understand where i'm coming from in 2007",
            "offset": 23039,
            "duration": 7121
        },
        {
            "lang": "en",
            "text": "89 i was in college i'm pretty excited",
            "offset": 27519,
            "duration": 4481
        },
        {
            "lang": "en",
            "text": "just learning how to program getting",
            "offset": 30160,
            "duration": 3680
        },
        {
            "lang": "en",
            "text": "pretty dang fast you know i did a little",
            "offset": 32000,
            "duration": 3360
        },
        {
            "lang": "en",
            "text": "bit in high school i did a little bit of",
            "offset": 33840,
            "duration": 2879
        },
        {
            "lang": "en",
            "text": "it when i was like you know in sixth",
            "offset": 35360,
            "duration": 3920
        },
        {
            "lang": "en",
            "text": "grade but now i'm really actually doing",
            "offset": 36719,
            "duration": 4160
        },
        {
            "lang": "en",
            "text": "it and the thing is is that i've always",
            "offset": 39280,
            "duration": 3279
        },
        {
            "lang": "en",
            "text": "been on a windows machine at that point",
            "offset": 40879,
            "duration": 4160
        },
        {
            "lang": "en",
            "text": "i just loved obviously gaming that was",
            "offset": 42559,
            "duration": 4881
        },
        {
            "lang": "en",
            "text": "my thing",
            "offset": 45039,
            "duration": 2401
        },
        {
            "lang": "en",
            "text": "you almost got me trapped oh i had a lot",
            "offset": 49760,
            "duration": 5439
        },
        {
            "lang": "en",
            "text": "of fun doing it and now all of a sudden",
            "offset": 52320,
            "duration": 5040
        },
        {
            "lang": "en",
            "text": "i'm in college and that's still the",
            "offset": 55199,
            "duration": 4241
        },
        {
            "lang": "en",
            "text": "operating system that i prefer of course",
            "offset": 57360,
            "duration": 3280
        },
        {
            "lang": "en",
            "text": "a lot of my classes and everything",
            "offset": 59440,
            "duration": 3279
        },
        {
            "lang": "en",
            "text": "require me to use centos or centos i",
            "offset": 60640,
            "duration": 3599
        },
        {
            "lang": "en",
            "text": "can't i have no idea the fresh maker i",
            "offset": 62719,
            "duration": 3521
        },
        {
            "lang": "en",
            "text": "have no idea how you actually say the",
            "offset": 64239.00000000001,
            "duration": 4001.0000000000005
        },
        {
            "lang": "en",
            "text": "thing but either way i you know would",
            "offset": 66240,
            "duration": 3919
        },
        {
            "lang": "en",
            "text": "straddle the line right for labs i used",
            "offset": 68240,
            "duration": 4239
        },
        {
            "lang": "en",
            "text": "centos at home i used windows and",
            "offset": 70159,
            "duration": 4081.0000000000005
        },
        {
            "lang": "en",
            "text": "netbeans on both because come on it's",
            "offset": 72479,
            "duration": 3841
        },
        {
            "lang": "en",
            "text": "netbeans the greatest editor of all time",
            "offset": 74240,
            "duration": 4320
        },
        {
            "lang": "en",
            "text": "in about 2008 i decided i wanted to",
            "offset": 76320,
            "duration": 4159
        },
        {
            "lang": "en",
            "text": "start a website i called it life in",
            "offset": 78560,
            "duration": 4239
        },
        {
            "lang": "en",
            "text": "america is hard i thought it was funny",
            "offset": 80479,
            "duration": 3921
        },
        {
            "lang": "en",
            "text": "you'd leave little notes about things",
            "offset": 82799,
            "duration": 3761
        },
        {
            "lang": "en",
            "text": "that are hard in america such as having",
            "offset": 84400,
            "duration": 4240
        },
        {
            "lang": "en",
            "text": "to wait in line for coffee",
            "offset": 86560,
            "duration": 3760
        },
        {
            "lang": "en",
            "text": "those kind of things right anyways while",
            "offset": 88640,
            "duration": 3200
        },
        {
            "lang": "en",
            "text": "i was developing it i kind of had this",
            "offset": 90320,
            "duration": 3200
        },
        {
            "lang": "en",
            "text": "idea okay i kind of want to get good at",
            "offset": 91840,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "linux and so in 2008 got partitioned by",
            "offset": 93520,
            "duration": 5279
        },
        {
            "lang": "en",
            "text": "machine put ubuntu on it and i stuck",
            "offset": 96400,
            "duration": 4480
        },
        {
            "lang": "en",
            "text": "with it for probably about a week but i",
            "offset": 98799,
            "duration": 4640
        },
        {
            "lang": "en",
            "text": "just i kind of like avoided it you know",
            "offset": 100880,
            "duration": 4640
        },
        {
            "lang": "en",
            "text": "what i mean like yes i was using it but",
            "offset": 103439,
            "duration": 4081.0000000000005
        },
        {
            "lang": "en",
            "text": "i really just avoided it i didn't",
            "offset": 105520,
            "duration": 3760
        },
        {
            "lang": "en",
            "text": "actually do it and ultimately i stopped",
            "offset": 107520,
            "duration": 4080
        },
        {
            "lang": "en",
            "text": "using it all together i kind of had this",
            "offset": 109280,
            "duration": 5600
        },
        {
            "lang": "en",
            "text": "mentality that i was right and when i",
            "offset": 111600,
            "duration": 4879
        },
        {
            "lang": "en",
            "text": "looked at things that had some sort of",
            "offset": 114880,
            "duration": 3599
        },
        {
            "lang": "en",
            "text": "friction or difficulty to them and i",
            "offset": 116479,
            "duration": 3920
        },
        {
            "lang": "en",
            "text": "could kind of perceive it i would just",
            "offset": 118479,
            "duration": 4081.0000000000005
        },
        {
            "lang": "en",
            "text": "assume they are wrong and what i mean by",
            "offset": 120399,
            "duration": 4720
        },
        {
            "lang": "en",
            "text": "this of course is like using the cli or",
            "offset": 122560,
            "duration": 4800
        },
        {
            "lang": "en",
            "text": "vim or any you know kind of like the",
            "offset": 125119,
            "duration": 4721
        },
        {
            "lang": "en",
            "text": "more hardcore hacker type things it just",
            "offset": 127360,
            "duration": 4720
        },
        {
            "lang": "en",
            "text": "felt like they were kind of a thing of",
            "offset": 129840,
            "duration": 4160
        },
        {
            "lang": "en",
            "text": "the past a relic of the past and really",
            "offset": 132080,
            "duration": 4400
        },
        {
            "lang": "en",
            "text": "the futures and these ids and that is it",
            "offset": 134000,
            "duration": 4720
        },
        {
            "lang": "en",
            "text": "and i didn't realize how much that was",
            "offset": 136480,
            "duration": 4720
        },
        {
            "lang": "en",
            "text": "going to hinder me for quite some time",
            "offset": 138720,
            "duration": 4800
        },
        {
            "lang": "en",
            "text": "uh for many many years i just simply",
            "offset": 141200,
            "duration": 4640
        },
        {
            "lang": "en",
            "text": "avoided all these hard things uh things",
            "offset": 143520,
            "duration": 4719
        },
        {
            "lang": "en",
            "text": "that were different not because they",
            "offset": 145840,
            "duration": 5119
        },
        {
            "lang": "en",
            "text": "were not beneficial but because i simply",
            "offset": 148239,
            "duration": 4961
        },
        {
            "lang": "en",
            "text": "assumed they weren't beneficial i had",
            "offset": 150959,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "this mentality where i believed i was",
            "offset": 153200,
            "duration": 4319
        },
        {
            "lang": "en",
            "text": "right and that didn't just stop with the",
            "offset": 155519,
            "duration": 4481
        },
        {
            "lang": "en",
            "text": "technologies i used it also happened to",
            "offset": 157519,
            "duration": 4321
        },
        {
            "lang": "en",
            "text": "be when i was at work how i treated",
            "offset": 160000,
            "duration": 3519
        },
        {
            "lang": "en",
            "text": "people all those kind of things right",
            "offset": 161840,
            "duration": 4640
        },
        {
            "lang": "en",
            "text": "because it all is one mentality i simply",
            "offset": 163519,
            "duration": 5601
        },
        {
            "lang": "en",
            "text": "believed myself to be more correct more",
            "offset": 166480,
            "duration": 5680
        },
        {
            "lang": "en",
            "text": "often than others in all sorts of areas",
            "offset": 169120,
            "duration": 5360
        },
        {
            "lang": "en",
            "text": "and yeah i was pretty smart i did the",
            "offset": 172160,
            "duration": 4400
        },
        {
            "lang": "en",
            "text": "best top of my class i was obviously",
            "offset": 174480,
            "duration": 4320
        },
        {
            "lang": "en",
            "text": "very good at my job excelled above other",
            "offset": 176560,
            "duration": 4720
        },
        {
            "lang": "en",
            "text": "people confidence kind of you know even",
            "offset": 178800,
            "duration": 4240
        },
        {
            "lang": "en",
            "text": "though it was a bad type of confidence",
            "offset": 181280,
            "duration": 4239
        },
        {
            "lang": "en",
            "text": "it kept compounding in on itself and if",
            "offset": 183040,
            "duration": 4960
        },
        {
            "lang": "en",
            "text": "i could go back i really just wish i",
            "offset": 185519,
            "duration": 5440
        },
        {
            "lang": "en",
            "text": "could tell myself you know it is okay to",
            "offset": 188000,
            "duration": 4879
        },
        {
            "lang": "en",
            "text": "be uncomfortable it is okay to use",
            "offset": 190959,
            "duration": 3920
        },
        {
            "lang": "en",
            "text": "something that is perceivably slower",
            "offset": 192879,
            "duration": 4241
        },
        {
            "lang": "en",
            "text": "than what you use right now or even way",
            "offset": 194879,
            "duration": 5201
        },
        {
            "lang": "en",
            "text": "more difficult to do the same thing",
            "offset": 197120,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "because it's not about your",
            "offset": 200080,
            "duration": 4239
        },
        {
            "lang": "en",
            "text": "instantaneous speed up it's about that",
            "offset": 201680,
            "duration": 5760
        },
        {
            "lang": "en",
            "text": "long-term dividend play if i would have",
            "offset": 204319,
            "duration": 5121
        },
        {
            "lang": "en",
            "text": "known this i would not have had nearly",
            "offset": 207440,
            "duration": 4000
        },
        {
            "lang": "en",
            "text": "as bad of an interview as i did for a",
            "offset": 209440,
            "duration": 4240
        },
        {
            "lang": "en",
            "text": "company i had they asked me hey could",
            "offset": 211440,
            "duration": 5040
        },
        {
            "lang": "en",
            "text": "you go through a directory and it has",
            "offset": 213680,
            "duration": 4800
        },
        {
            "lang": "en",
            "text": "subdirectories and all these different",
            "offset": 216480,
            "duration": 4000
        },
        {
            "lang": "en",
            "text": "files have uh you know just have a bunch",
            "offset": 218480,
            "duration": 3360
        },
        {
            "lang": "en",
            "text": "of html and all this but we've been",
            "offset": 220480,
            "duration": 2960
        },
        {
            "lang": "en",
            "text": "hacked and there's a bunch of free",
            "offset": 221840,
            "duration": 4240
        },
        {
            "lang": "en",
            "text": "viagra call this number throughout all",
            "offset": 223440,
            "duration": 4000
        },
        {
            "lang": "en",
            "text": "these different files and we'd like to",
            "offset": 226080,
            "duration": 4320
        },
        {
            "lang": "en",
            "text": "remove all of them now of course me",
            "offset": 227440,
            "duration": 5760
        },
        {
            "lang": "en",
            "text": "being the young spittin engineer with",
            "offset": 230400,
            "duration": 4960
        },
        {
            "lang": "en",
            "text": "zero tolerance for the cli and those",
            "offset": 233200,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "other things what did i do i literally",
            "offset": 235360,
            "duration": 4879
        },
        {
            "lang": "en",
            "text": "by hand wrote perfectly working java",
            "offset": 237760,
            "duration": 5280
        },
        {
            "lang": "en",
            "text": "code buffered writer tokenizer bam bam",
            "offset": 240239,
            "duration": 5761
        },
        {
            "lang": "en",
            "text": "bam bam bam wrote the entire recursive",
            "offset": 243040,
            "duration": 5919
        },
        {
            "lang": "en",
            "text": "directory walk from my heart of hearts",
            "offset": 246000,
            "duration": 4799
        },
        {
            "lang": "en",
            "text": "onto the board and of course what did my",
            "offset": 248959,
            "duration": 3360
        },
        {
            "lang": "en",
            "text": "interviewer do you could have just used",
            "offset": 250799,
            "duration": 2481
        },
        {
            "lang": "en",
            "text": "crep",
            "offset": 252319,
            "duration": 3280
        },
        {
            "lang": "en",
            "text": "and it was kind of like in that moment i",
            "offset": 253280,
            "duration": 5359
        },
        {
            "lang": "en",
            "text": "realized i should probably know more",
            "offset": 255599,
            "duration": 5360
        },
        {
            "lang": "en",
            "text": "right because looking back on it it's",
            "offset": 258639,
            "duration": 4401
        },
        {
            "lang": "en",
            "text": "obvious i know exactly how i would solve",
            "offset": 260959,
            "duration": 4800
        },
        {
            "lang": "en",
            "text": "that now you know boom little said grep",
            "offset": 263040,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "super combo right it'd be super easy to",
            "offset": 265759,
            "duration": 3761
        },
        {
            "lang": "en",
            "text": "kind of go through some stuff and just",
            "offset": 267600,
            "duration": 3200
        },
        {
            "lang": "en",
            "text": "depending on like if you just want the",
            "offset": 269520,
            "duration": 2320
        },
        {
            "lang": "en",
            "text": "list of files or do you want me to",
            "offset": 270800,
            "duration": 2800
        },
        {
            "lang": "en",
            "text": "change them right and so i kind of feel",
            "offset": 271840,
            "duration": 4960
        },
        {
            "lang": "en",
            "text": "stupid right now looking back and so i",
            "offset": 273600,
            "duration": 5039
        },
        {
            "lang": "en",
            "text": "really hope you can hear this it's not",
            "offset": 276800,
            "duration": 3920
        },
        {
            "lang": "en",
            "text": "just me trying to get you to use vim or",
            "offset": 278639,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "saying the cli is the best place but",
            "offset": 280720,
            "duration": 5280
        },
        {
            "lang": "en",
            "text": "really for you to look at problems and",
            "offset": 283199,
            "duration": 4641
        },
        {
            "lang": "en",
            "text": "understand that you don't know",
            "offset": 286000,
            "duration": 4080
        },
        {
            "lang": "en",
            "text": "everything and that using things that",
            "offset": 287840,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "seem different or strange it's okay",
            "offset": 290080,
            "duration": 4399
        },
        {
            "lang": "en",
            "text": "because ultimately it's gonna make you a",
            "offset": 292400,
            "duration": 4480
        },
        {
            "lang": "en",
            "text": "better engineer and who knows it may pay",
            "offset": 294479,
            "duration": 4561
        },
        {
            "lang": "en",
            "text": "some amazing dividends down the road and",
            "offset": 296880,
            "duration": 3520
        },
        {
            "lang": "en",
            "text": "hopefully you don't look like such a",
            "offset": 299040,
            "duration": 4320
        },
        {
            "lang": "en",
            "text": "doofus as i did during that interview so",
            "offset": 300400,
            "duration": 5440
        },
        {
            "lang": "en",
            "text": "go ahead if all you ever use is vs code",
            "offset": 303360,
            "duration": 3839
        },
        {
            "lang": "en",
            "text": "try emacs look at this i'm not even",
            "offset": 305840,
            "duration": 2960
        },
        {
            "lang": "en",
            "text": "suggesting my favorite editor vim at",
            "offset": 307199,
            "duration": 3681
        },
        {
            "lang": "en",
            "text": "this point go just try anything else go",
            "offset": 308800,
            "duration": 4399
        },
        {
            "lang": "en",
            "text": "try intellij go try some other things",
            "offset": 310880,
            "duration": 4400
        },
        {
            "lang": "en",
            "text": "see what you can do your all you ever do",
            "offset": 313199,
            "duration": 4720
        },
        {
            "lang": "en",
            "text": "is just do react and front end try solid",
            "offset": 315280,
            "duration": 5759
        },
        {
            "lang": "en",
            "text": "try view expand your horizon try to",
            "offset": 317919,
            "duration": 4961
        },
        {
            "lang": "en",
            "text": "understand things better because",
            "offset": 321039,
            "duration": 4481
        },
        {
            "lang": "en",
            "text": "ultimately the more ways you see a",
            "offset": 322880,
            "duration": 5280
        },
        {
            "lang": "en",
            "text": "problem be solved the more ways that you",
            "offset": 325520,
            "duration": 5040
        },
        {
            "lang": "en",
            "text": "can solve a problem we are often limited",
            "offset": 328160,
            "duration": 4479
        },
        {
            "lang": "en",
            "text": "by our experiences and that's really",
            "offset": 330560,
            "duration": 5040
        },
        {
            "lang": "en",
            "text": "what separates a junior from a senior is",
            "offset": 332639,
            "duration": 5361
        },
        {
            "lang": "en",
            "text": "just experiences experiences seeing",
            "offset": 335600,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "things done differently and ultimately",
            "offset": 338000,
            "duration": 4160
        },
        {
            "lang": "en",
            "text": "that's going to make you a much better",
            "offset": 340160,
            "duration": 4319
        },
        {
            "lang": "en",
            "text": "engineer and i really wish i could have",
            "offset": 342160,
            "duration": 4560
        },
        {
            "lang": "en",
            "text": "told myself that a decade ago i hope you",
            "offset": 344479,
            "duration": 4321
        },
        {
            "lang": "en",
            "text": "liked this video please subscribe and of",
            "offset": 346720,
            "duration": 3600
        },
        {
            "lang": "en",
            "text": "course actually make a comment down",
            "offset": 348800,
            "duration": 3200
        },
        {
            "lang": "en",
            "text": "below tell me a little story about",
            "offset": 350320,
            "duration": 3840
        },
        {
            "lang": "en",
            "text": "yourself i probably will reply to you my",
            "offset": 352000,
            "duration": 4960
        },
        {
            "lang": "en",
            "text": "name is the primegen",
            "offset": 354160,
            "duration": 2800
        }
    ]
}

type SummaryResponseType = {
    summary: string;
    suggestedClips?: Array<{
        title: string;
        time: string;
    }>
}

function AnalyzeVideo() {
  const [transcript, setTranscript] = useState<TranscriptResponse | null>(null)
  const [summary, setSummary] = useState<SummaryResponseType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setmounted] = useState(false);
  const [pageState, setPageState] = useState<PageStateType>("ready")
  const {id} = useParams()
  const router = useRouter()
  const playerRef = useRef<HTMLVideoElement>(null)
   const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    playerRef.current = player;
    console.log(player);
  }, []);
  
  
  const fetchVideoDetails = async ()=>{
    try{
         const response = await axios.post(`/api/transcribe`, {
        videoId: id
      })
      const data = await response.data
      // setTranscript(data)
      console.log(data);
      
      const plainText = transcriptToString(data.transcript);
      console.log(plainText);
      if(data){
        setPageState("loading_summary")
        const summaryData = await axios.post(`/api/summarize`, {
          text: plainText
        })
        // setSummary(summary.data)
        console.log(summaryData.data);
        setPageState("ready")
      }
    } catch (err){
    
        setPageState("error")
      console.log(err);      
      setError("Failed to fetch the video details try again later.")
      toast.error("failed to fetch video details")
    }
  }


  async function fetchAllDet(){
    setPageState("loading_summary")
    try{
        const response = await axios.post('/api/summarize', {
            text: JSON.stringify(transcriptTestOject)
        })
        setSummary(response.data);
        console.log(response.data);
        setPageState("ready")
    }catch(err){
        console.log(err);    
        setPageState("error")
        setError("something went wrong")   
    }
    
  }

  function seekPlayer(time: string){
    if(!playerRef.current){return}
    playerRef.current.currentTime = Number(time) * playerRef.current.duration;
  }

  useEffect(() => {
    setmounted(true)
    fetchAllDet()
    // fetchVideoDetails()
  }, [])
  
  if(!mounted){return null}

  if(pageState=="loading_transcript"){
    return <div className="h-screen w-full text-center">
        <h1 className='text-3xl'>Fetching the Video....</h1>
    </div>
  }

  if(pageState=="loading_summary"){
    return <div className="h-screen w-full">
      <h1 className='text-3xl'>watching the video in 1000x speed...</h1>
    </div>
  }

  if(pageState == "error"){
    return <div className="h-screen w-full text-center">
      <h1 className='text-3xl'>something failed, try again later</h1>
      <Button
      onClick={()=>{
        router.push('/')
      }}
      >
        Back to Home
      </Button>
    </div>
  }

  const items = [
    {
       id: 0,
    label: "Summary",
    content: <div className="">
      <p className='px-4 py-4 bg-muted rounded-xl'>{summary?.summary}</p>
    </div>
    },
    {
       id: 1,
    label: "Transcript",
    content: <div className="">
      <p className='px-4 py-4 bg-muted rounded-xl'>
        {
            transcriptTestOject.content.map((item, idx)=>{
                return <p key={idx}>{item.text} : {item.duration} </p>
            })
        }
      </p>
    </div>
    },
    {
       id: 2,
    label: "Ask AI",
    content: <div className="">
      <p className='px-4 py-4 bg-muted rounded-xl'>Comming Soon...</p>
    </div>
    }
    
  ]

  if(pageState == "ready" && summary){
    return (
    <div className='h-screen py-15 px-8 w-full flex items-start justify-between gap-5'>
      <div className="w-full h-screen flex flex-col gap-3 overflow-y-auto scrollbar-hide">
       <DirectionAwareTabs
       tabs={items}
       />
      </div>
      <div className="h-full scrollbar-hide w-full overflow-y-auto">
        <div className="rounded-xl h-100">
            <ReactPlayer
            ref={setPlayerRef}
            src={`youtube.com/watch?v=${id}`}
            controls
            style={{width: "100%", height: "100%"}}
            />
        </div>
        <div className="px-2 mt-3">
          <h3 className='text-right text-xl font-semibold mb-3'>Suggested Clips</h3>
          <div className="flex flex-col items-end justify-end gap-4">
            {
                summary.suggestedClips && summary.suggestedClips.map((clip, index)=>{
                    return <Button
                    variant={"secondary"}
                    key={index} 
                    onClick={()=>{
                        seekPlayer(clip.time)
                    }}
                    className="">
                
                            {clip.title}
                        </Button>
                 
                })
            }
           
          </div>
        </div>
      </div>
    </div>
  )
}
}

export default AnalyzeVideo
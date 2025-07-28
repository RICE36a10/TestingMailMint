"use client";
import React, {useState} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Sparkles, LoaderCircle} from "lucide-react";
import AIInputBox from "@/components/custom/AIInputBox";
import {Button} from "@/components/ui/button";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {v4 as uuidv4} from "uuid";
import {useRouter} from "next/navigation";
import {useUserDetail, useEmailTemplate} from "@/app/provider";

export default function Create() {
    const [scratchClicked, setScratchClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const saveTemplate = useMutation(api.emailTemplate.SaveTemplate);
    const {userDetail} = useUserDetail();
    const {setEmailTemplate} = useEmailTemplate();

    const handleStartNow = async () => {
        if(!userDetail?.email) return;
        const tid = uuidv4();
        setLoading(true);
        try {
            await saveTemplate({
                tid: tid,
                design: [],
                email: userDetail.email,
                description: "Blank Template",
            });
            setEmailTemplate([]);
            router.push('/editor/' + tid);
        } catch (e) {
            console.error('Error creating template from scratch', e);
            setLoading(false);
        }
    };

    return (
        <div className={'px-10 md:px-28 lg:px-64 xl:px-72 mt-20 '}>
            <div className={'flex flex-col items-center '}>
                <h2 className={'font-bold text-3xl text-primary  '}>
                    Create New Email Template
                </h2>
                <p className={'text-lg text-gray-400        '}>
                    design with help of AI
                </p>

                <Tabs
                    defaultValue="AI"
                    className="w-[500px]  mt-10   "
                    onValueChange={(val) => {
                        if (val === "Scratch") setScratchClicked(true);
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="AI">Create with AI  <Sparkles className={'h-5 w-4 ml-2'}/> </TabsTrigger>
                        <TabsTrigger value="Scratch">Start from Scratch</TabsTrigger>
                    </TabsList>
                    <TabsContent value="AI">
                        <AIInputBox/>
                    </TabsContent>
                    <TabsContent value="Scratch">
                        <div className={'  ml-24  mt-20'}>
                            {scratchClicked ? (
                                <Button className={"transform transition-transform duration-200 hover:scale-125"} onClick={handleStartNow} disabled={loading}>
                                    {loading ? (
                                        <span className={'scale-125 flex'}>
                                            <LoaderCircle className={'animate-spin'} />
                                        </span>
                                    ) : (
                                        'Start Now'
                                    )}
                                </Button>
                            ) : (
                                "Coming soon"
                            )}
                        </div>
                    </TabsContent>
                </Tabs>



            </div>
        </div>
    );
}

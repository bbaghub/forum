import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { communityTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import {Tabs, TabsContent, TabsList,TabsTrigger} from "@/components/ui/tabs"
import ProfileHeader from "@/components/shared/ProfileHeader"
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";


async function Page ({params}:{params:{id:string}})  {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const communityDetails = await fetchCommunityDetails(params.id)



    return (
        <section>
            <ProfileHeader
            accountId ={communityDetails.id}
            authUserId={user.id}
            name={communityDetails.name}
            username={communityDetails.username}
            imgUrl={communityDetails.image}
            bio={communityDetails.bio}
            type="community"
            />

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-ful">
                    <TabsList className="tab">
                        {communityTabs.map((tab) =>(
                            <TabsTrigger key={tab.label} value={tab.value}>
                                <Image
                                src={tab.icon}
                                alt={tab.label}
                                width={24}
                                height={24}
                                className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>
                                {tab.label === 'Threads' &&(
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">{communityDetails?.threads.length}</p>)}
                            </TabsTrigger>
                        ))}
                    </TabsList>
             
                        <TabsContent  value="threads" className="w-full text-light-1">
                            <ThreadsTab
                            currentUserId = {user.id}
                            accountId={communityDetails.id}
                            accountType="User"
                            />
                        </TabsContent>
                        <TabsContent  value="members" className="w-full text-light-1">
                            <section className="mt-9 flex fel-col gap-10">
                                {communityDetails?.members.map((member:any) => (
                                    <UserCard
                                    key={member.id}
                                    id={member.id}
                                    name={member.name}
                                    username={member.username}
                                    imgUrl={member.image}
                                    personType="User"
                                    />
                                ))}
                            </section>
                            <ThreadsTab
                            currentUserId = {user.id}
                            accountId={communityDetails.id}
                            accountType="User"
                            />
                        </TabsContent>
                        <TabsContent  value="request" className="w-full text-light-1">
                            <ThreadsTab
                            currentUserId = {user.id}
                            accountId={communityDetails.id}
                            accountType="User"
                            />
                        </TabsContent>
                  
                </Tabs>
            </div>
        </section>
    )
}

export default Page
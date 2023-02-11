import BidForms from '../components/Makebid';

function BidsPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 p-6 bg-white rounded-lg shadow-xl">
                <BidForms />
            </div>
        </div>
    );
}

export default BidsPage;
